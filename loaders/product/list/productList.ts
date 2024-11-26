import { Product } from "apps/commerce/types.ts";
import { AppContext } from "apps/records/mod.ts";
import {
    additionalProperties,
    avaliableIn,
    brands,
    images,
    productCategories,
    productMeasurements,
    products,
} from "../../../db/schema.ts";
import { and, asc, desc, eq, inArray, or, sql } from "drizzle-orm";
import { getCategoryTree } from "../../../utils/product/getProduct.ts";

export interface Props {
    /**
     * @title List Option
     */
    listOption: ProductsSkus[] | ProductCategory;
    /**
     * @title Skip
     * @description The number of products to skip
     */
    skip?: number;
    /**
     * @title Take
     * @description The number of products to take, after skipping the specified number of products
     */
    take?: number;
    /**
     * @title Sort By
     * @description Sort option of the products
     */
    sortBy?: "name-asc" | "name-desc";
}

type ProductsSkus = string;

interface ProductCategory {
    /**
     * @title Category ID
     * @format dynamic-options
     * @options elux-components-app/loaders/product/avaliableCategories.ts
     */
    category: string;
    /**
     * @title Normal Filters
     */
    normalFilters?: NormalFilters[];
    /**
     * @title Measurements Filters
     */
    measurementsFilters?: MeasurementsFilters[];
}

interface NormalFilters extends BaseFilter {
    /**
     * @title Filter Key
     * @format dynamic-options
     * @options elux-components-app/loaders/product/avaliableFiltersGroups.ts
     */
    filter: string;
}

interface MeasurementsFilters extends BaseFilter {
    /**
     * @title Measurement Key
     */
    filter: "width" | "height" | "depth" | "weight";
}

interface BaseFilter {
    /**
     * @title Filter Values
     */
    value: string[];
}

interface BaseProduct {
    name: string;
    productID: string;
    sku: string;
    gtin: string | null;
    brand_name: string;
    brand_id: string;
}

interface BaseImage {
    url: string;
    name: string | null;
    description: string | null;
    identifier: number;
    subjectOf: string | null;
    disambiguatingDescription: string | null;
    additionalType: string | null;
}

export default async function loader(
    { listOption, skip = 0, take = 10, sortBy = "name-asc" }: Props,
    req: Request,
    ctx: AppContext,
): Promise<Product[] | null> {
    const url = new URL(req.url);
    const records = await ctx.invoke.records.loaders.drizzle();
    const listingByCategory = "category" in listOption;

    if (!listingByCategory) {
        //This query gets products by skus
        const [baseProducts, productImages] = await Promise.all([
            records.select({
                name: products.name,
                productID: products.productID,
                sku: products.sku,
                gtin: products.gtin,
                brand_name: brands.name,
                brand_id: brands.identifier,
            })
                .from(products)
                .innerJoin(brands, eq(products.brand, brands.identifier))
                .leftJoin(
                    avaliableIn,
                    eq(products.sku, avaliableIn.subjectOf),
                )
                .where(
                    and(
                        inArray(
                            products.sku,
                            listOption.map((sku) => sku),
                        ),
                        sql`${url.hostname} LIKE '%' || ${avaliableIn.domain}`,
                    ),
                )
                .groupBy(products.sku)
                .orderBy(
                    sortBy === "name-asc"
                        ? asc(products.name)
                        : desc(products.name),
                )
                .limit(take)
                .offset(skip),
            records
                .select()
                .from(images)
                .where(
                    and(
                        inArray(
                            images.subjectOf,
                            listOption.map((sku) => sku),
                        ),
                        eq(images.additionalType, "PRODUCT_IMAGE"),
                    ),
                )
                .all(),
        ]);

        return joinProductData(baseProducts, productImages, url);
    }

    //Get the category tree
    const localCategoryTree = await getCategoryTree(
        records,
        listOption.category.split("---")[0],
    );

    const normalFilters = new Map<string, string[]>();
    const measurementsFilters = new Map<string, string[]>();

    for (const { filter, value } of listOption.normalFilters ?? []) {
        normalFilters.set(filter, value);
    }

    for (const { filter, value } of listOption.measurementsFilters ?? []) {
        measurementsFilters.set(filter, value);
    }

    const baseProducts = await records.select({
        name: products.name,
        productID: products.productID,
        sku: products.sku,
        gtin: products.gtin,
        brand_name: brands.name,
        brand_id: brands.identifier,
    }).from(productCategories)
        .innerJoin(
            products,
            eq(productCategories.product, products.sku),
        )
        .innerJoin(
            brands,
            eq(products.brand, brands.identifier),
        )
        .leftJoin(
            avaliableIn,
            eq(productCategories.product, avaliableIn.subjectOf),
        )
        .leftJoin(
            additionalProperties,
            eq(productCategories.product, additionalProperties.subjectOf),
        )
        .leftJoin(
            productMeasurements,
            eq(productCategories.product, productMeasurements.subjectOf),
        )
        .where(
            and(
                inArray(
                    productCategories.subjectOf,
                    localCategoryTree.map((c) => c.identifier),
                ),
                sql`${url.hostname} LIKE '%' || ${avaliableIn.domain}`,
            ),
        )
        .having(
            and(
                normalFilters.size > 0 //This is the query to get the SKUs that match the filters
                    ? and(
                        ...Array.from(normalFilters.entries()).map(
                            ([key, values]) => {
                                return sql`SUM(CASE WHEN ${additionalProperties.additionalType} = ${key} AND ${
                                    inArray(additionalProperties.value, values)
                                } THEN 1 ELSE 0 END) > 0`;
                            },
                        ),
                    )
                    : undefined,
                measurementsFilters.size > 0 //This is the query to get the SKUs that match the measurements
                    ? and(
                        ...Array.from(measurementsFilters.entries()).map(
                            ([key, ranges]) => {
                                return sql`SUM(CASE WHEN ${productMeasurements.propertyID} = ${key.toUpperCase()} AND ${
                                    or(
                                        ...ranges.map((range) => {
                                            const [min, max] = range.split("-")
                                                .map(Number);
                                            return sql`(${productMeasurements.minValue} >= ${min} AND ${productMeasurements.minValue} <= ${
                                                max + 0.99
                                            })`;
                                        }),
                                    )
                                } THEN 1 ELSE 0 END) > 0`;
                            },
                        ),
                    )
                    : undefined,
            ),
        )
        .groupBy(products.sku)
        .orderBy(
            sortBy === "name-asc" ? asc(products.name) : desc(products.name),
        )
        .limit(take)
        .offset(skip);

    if (!baseProducts.length) return null;

    const productImages = await records
        .select()
        .from(images)
        .where(
            and(
                inArray(
                    images.subjectOf,
                    baseProducts.map((p) => p.sku),
                ),
                eq(images.additionalType, "PRODUCT_IMAGE"),
            ),
        )
        .all();

    return joinProductData(baseProducts, productImages, url);
}

const joinProductData = (
    baseProducts: BaseProduct[],
    productImages: BaseImage[],
    url: URL,
) => baseProducts.map<Product>((p) => ({
    "@type": "Product",
    name: p.name,
    sku: p.sku,
    productID: p.productID ?? "",
    gtin: p.gtin ?? undefined,
    url: new URL(
        `${p.productID}/p`,
        url.origin,
    ).href,
    brand: {
        "@type": "Brand",
        name: p.brand_name,
        identifier: p.brand_id,
    },
    image: productImages
        .filter((i) => i.subjectOf === p.sku)
        .map((i) => ({
            "@type": "ImageObject" as const,
            ...i,
            name: i.name ?? undefined,
            description: i.description ?? undefined,
            disambiguatingDescription: i.disambiguatingDescription ??
                undefined,
            subjectOf: i.subjectOf ?? undefined,
            identifier: String(i.identifier),
            additionalType: i.additionalType ?? undefined,
        })),
}));

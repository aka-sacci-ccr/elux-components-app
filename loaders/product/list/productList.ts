import { Product } from "apps/commerce/types.ts";
import { AppContext } from "apps/records/mod.ts";
import { brands, images, products } from "../../../db/schema.ts";
import { and, asc, desc, eq, inArray } from "drizzle-orm";

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
   * @title Filters
   */
  filters?: ProductFilters[];
}

interface ProductFilters {
  /**
   * @title Filter Id
   * @description The url of the filter, as in used in listing page
   */
  filter: string;
  /**
   * @title Filter Values
   */
  value: string[];
}

export default async function loader(
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Product[] | null> {
  const url = new URL(req.url);
  const products = await getProducts({ ...props, ctx, url });
  return products;
}

const getProducts = async (
  { listOption, skip = 0, take = 10, ctx, sortBy = "name-asc", url }: {
    ctx: AppContext;
    url: URL;
  } & Props,
) => {
  const records = await ctx.invoke.records.loaders.drizzle();
  const listingByCategory = "category" in listOption;

  if (!listingByCategory) {
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
        .where(
          inArray(
            products.sku,
            listOption.map((sku) => sku),
          ),
        )
        .groupBy(products.sku)
        .orderBy(
          sortBy === "name-asc" ? asc(products.name) : desc(products.name),
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

    return baseProducts.map<Product>((p) => ({
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
  }
  return null;
  //TODO: Implement list by category
};

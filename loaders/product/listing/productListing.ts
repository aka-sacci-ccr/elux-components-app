import {
  BreadcrumbList,
  Product,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { AppContext } from "apps/records/mod.ts";
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { AdditionalProperty, Category } from "../../../utils/types.ts";
import { LibSQLDatabase } from "apps/records/deps.ts";
import {
  additionalProperties,
  avaliableIn,
  brands,
  images,
  productCategories,
  products,
} from "../../../db/schema.ts";
import { filterValues } from "../../testPLP.ts";
import { logger } from "@deco/deco/o11y";
import {
  getSortOptions,
  SortOptions,
} from "../../../utils/product/constants.ts";

interface ExtendedCategory extends Category {
  additionalType?: string;
}

export interface Props {
  recordsPerPage: number;
  page?: number;
  sort?: SortOptions;
}

export default async function loader(
  { recordsPerPage, page, sort }: Props,
  req: Request,
  ctx: AppContext,
): Promise<ProductListingPage | null> {
  const url = new URL(req.url);
  const pageNumber = page ?? url.searchParams.get("page") ?? 1;
  const sortOption = sort ?? url.searchParams.get("sort") ?? "name-asc";
  const records = await ctx.invoke.records.loaders.drizzle();
  const paths = url.pathname.split("/").splice(1);
  const fatherCategoryPath = paths[0];
  const categoryTree = await getCategoryTree(records, fatherCategoryPath);

  if (!checkPath(paths, categoryTree)) {
    logger.error("path is wrong");
    return null;
  }
  const validCategory = categoryTree.find(({ identifier }) =>
    identifier === paths[paths.length - 1]
  );

  const categoryBranch = validCategory?.additionalType === "1"
    ? categoryTree.map(({ identifier, value }) => ({ identifier, value }))
    : getCategoryBranch(categoryTree, validCategory!);

  const skusToGet = await records.select({
    product: productCategories.product,
  }).from(productCategories)
    .where(
      inArray(
        productCategories.subjectOf,
        categoryBranch.map((c) => c.identifier),
      ),
    )
    .groupBy(productCategories.product);

  if (!skusToGet.length || !skusToGet[0].product) return null;

  //@ts-ignore Actually, ctx.language exists
  const sortOptions = getSortOptions(ctx.language);

  const products = await getProductData(
    records,
    skusToGet,
    url,
    Number(pageNumber),
    recordsPerPage,
    sortOptions.map((opt) => opt.value).includes(sortOption)
      ? sortOption as SortOptions
      : "name-asc",
  );

  if (!products) return null;

  const totalProducts = skusToGet.length;
  const totalPages = Math.ceil(totalProducts / recordsPerPage);
  const currentPage = Number(pageNumber);

  return {
    "@type": "ProductListingPage",
    breadcrumb: getBreadcrumbList(paths, categoryTree, url),
    products: products.productData,
    filters: filterValues,
    pageInfo: {
      currentPage,
      nextPage: currentPage < totalPages
        ? `?page=${currentPage + 1}`
        : undefined,
      previousPage: currentPage > 1 ? `?page=${currentPage - 1}` : undefined,
      records: totalProducts,
      recordPerPage: recordsPerPage,
    },
    sortOptions,
    seo: {
      title: validCategory?.value ?? "",
      description: validCategory?.description ?? "",
      canonical: new URL(url.pathname, url.origin).href,
    },
  };
}

const getBreadcrumbList = (
  pathnames: string[],
  categoryTree: ExtendedCategory[],
  url: URL,
): BreadcrumbList => {
  return {
    "@type": "BreadcrumbList",
    itemListElement: pathnames.map((pathname, index) => {
      const category = categoryTree.find(({ identifier }) =>
        identifier === pathname
      );
      return {
        "@type": "ListItem",
        position: index + 1,
        item: category?.value ?? "",
        url: new URL(pathnames.slice(0, index + 1).join("/"), url.origin).href,
        image: category?.image
          ? [{
            "@type": "ImageObject",
            url: category.image,
          }]
          : undefined,
      };
    }),
    numberOfItems: pathnames.length,
  };
};

const getProductData = async (
  records: LibSQLDatabase<Record<string, never>>,
  skusToGet: {
    product: string | null;
  }[],
  url: URL,
  page: number = 1,
  recordsPerPage: number = 20,
  sortBy: SortOptions,
): Promise<
  {
    productData: Product[];
    productProperties: AdditionalProperty[];
  } | null
> => {
  const offset = (page - 1) * recordsPerPage;
  const baseProductData = await records.select({
    name: products.name,
    productID: products.productID,
    sku: products.sku,
    gtin: products.gtin,
    brand_name: brands.name,
    brand_id: brands.identifier,
  })
    .from(products)
    .innerJoin(brands, eq(products.brand, brands.identifier))
    .innerJoin(avaliableIn, eq(products.sku, avaliableIn.subjectOf))
    .where(
      and(
        inArray(
          products.sku,
          skusToGet.map((sku) => sku.product!),
        ),
        sql`${url.hostname} LIKE '%' || ${avaliableIn.domain}`,
      ),
    )
    .groupBy(products.sku)
    .orderBy(sortBy === "name-asc" ? asc(products.name) : desc(products.name))
    .limit(recordsPerPage)
    .offset(offset);

  if (!baseProductData.length) return null;

  const [productImages, productProperties] = await Promise.all([
    records
      .select()
      .from(images)
      .where(
        and(
          inArray(images.subjectOf, baseProductData.map((p) => p.sku)),
          eq(images.additionalType, "PRODUCT_IMAGE"),
        ),
      )
      .all(),
    records
      .select()
      .from(additionalProperties)
      .where(
        inArray(
          additionalProperties.subjectOf,
          baseProductData.map((p) => p.sku),
        ),
      )
      .all(),
  ]);

  return {
    productData: baseProductData.map<Product>((p) => ({
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
      image: productImages.filter((i) => i.subjectOf === p.sku).map((i) => ({
        "@type": "ImageObject" as const,
        ...i,
        name: i.name ?? undefined,
        description: i.description ?? undefined,
        disambiguatingDescription: i.disambiguatingDescription ?? undefined,
        subjectOf: i.subjectOf ?? undefined,
        identifier: String(i.identifier),
        additionalType: i.additionalType ?? undefined,
      })),
    })),
    productProperties: productProperties as unknown as AdditionalProperty[],
  };
};

const getCategoryBranch = (
  categories: ExtendedCategory[],
  validCategory: ExtendedCategory,
): {
  identifier: string;
  value: string;
}[] => {
  const getChildIdentifiers = (parentIds: string[]): string[] =>
    parentIds.length === 0 ? [] : [
      ...parentIds,
      ...getChildIdentifiers(
        categories
          .filter((cat) => parentIds.includes(cat.subjectOf ?? ""))
          .map((cat) => cat.identifier),
      ),
    ];

  return getChildIdentifiers([validCategory.identifier]).map((identifier) => ({
    identifier,
    value: categories.find((cat) => cat.identifier === identifier)!.value,
  }));
};

const getCategoryTree = async (
  records: LibSQLDatabase<Record<string, never>>,
  fatherCategoryPath: string,
) =>
  await records.run(sql`
    WITH RECURSIVE
    CategoryTree AS (
      SELECT
        identifier,
        value,
        description,
        additionalType,
        subjectOf,
        image
      FROM
        categories
      WHERE
        identifier = ${fatherCategoryPath}
      UNION ALL
      SELECT
        c.identifier,
        c.value,
        c.description,
        c.additionalType,
        c.subjectOf,
        c.image
      FROM
        categories c
        INNER JOIN CategoryTree ct ON c.subjectOf = ct.identifier
    )
  SELECT
    *
  FROM
    CategoryTree;
    `).then((result) => result.rows) as unknown as ExtendedCategory[];

const checkPath = (paths: string[], categories: ExtendedCategory[]) =>
  paths.reduce(
    (acc, p, index) => {
      if (acc === false) {
        return false;
      }
      const category = categories.find(({ identifier }) => identifier === p);
      if (
        category &&
        ((index === 0 && category.additionalType === "1") ||
          category.subjectOf === paths[index - 1])
      ) {
        return true;
      }
      return false;
    },
    true,
  );

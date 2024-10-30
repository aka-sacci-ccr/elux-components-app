import { AppContext } from "apps/records/mod.ts";
import {
  additionalProperties,
  avaliableIn,
  brands,
  descriptions,
  domains,
  images,
  products,
  videos,
} from "../../db/schema.ts";
import { eq, sql } from "drizzle-orm";
import { Product } from "apps/commerce/types.ts";

interface ProductBase {
  sku: string;
  name: string;
  productID: string;
  description: string | null;
  gtin: string | null;
  releaseDate: string | null;
  brand_name: string;
  brand_id: string;
}

interface AdditionalProperty {
  name: string;
  value: string;
  identifier: number;
  subjectOf: string | null;
  propertyID: string;
  unitCode: string | null;
  unitText: string | null;
}

interface Description {
  name: string;
  identifier: number;
  subjectOf: string | null;
  value: string;
  image: string | null;
}

interface Image {
  name: string | null;
  url: string;
  description: string | null;
  identifier: number;
  additionalType: string | null;
  disambiguatingDescription: string | null;
  subjectOf: string | null;
}

interface Video {
  identifier: number;
  subjectOf: string | null;
  contentUrl: string;
  thumbnailUrl: string;
  uploadDate: string | null;
  duration: string | null;
}

interface Category {
  identifier: string;
  value: string;
  subjectOf: string | null;
}

interface Avaliability {
  identifier: string;
  description: string;
}

export async function getProductBySku(
  sku: string,
  ctx: AppContext,
  url: URL,
): Promise<Product | null> {
  const records = await ctx.invoke.records.loaders.drizzle();
  const productBase = await records
    .select({
      name: products.name,
      productID: products.productID,
      description: products.description,
      gtin: products.gtin,
      releaseDate: products.releaseDate,
      brand_name: brands.name,
      brand_id: brands.identifier,
    })
    .from(products)
    .innerJoin(brands, eq(products.brand, brands.identifier))
    .where(eq(products.sku, sku))
    .get();

  if (!productBase) {
    return null;
  }

  const [
    additionalProperty,
    description,
    image,
    video,
    category,
    avaliability,
  ] = await Promise.all([
    records
      .select()
      .from(additionalProperties)
      .where(eq(additionalProperties.subjectOf, sku))
      .all(),

    records
      .select()
      .from(descriptions)
      .where(eq(descriptions.subjectOf, sku))
      .all(),

    records
      .select()
      .from(images)
      .where(eq(images.subjectOf, sku))
      .all(),

    records
      .select()
      .from(videos)
      .where(eq(videos.subjectOf, sku))
      .all(),

    records.run(sql`
        WITH RECURSIVE CategoryHierarchy AS (
          SELECT
            c.identifier,
            c.value,
            c.subjectOf
          FROM
            productCategories AS pc
            INNER JOIN categories AS c ON pc.subjectOf = c.identifier
          WHERE
            pc.product = ${sku}
          UNION
          SELECT
            parent.identifier,
            parent.value,
            parent.subjectOf
          FROM
            categories AS parent
            INNER JOIN CategoryHierarchy AS child ON child.subjectOf = parent.identifier
        )
        SELECT
          *
        FROM
          CategoryHierarchy
        `),

    records
      .select({
        identifier: domains.identifier,
        description: domains.description,
      })
      .from(avaliableIn)
      .innerJoin(domains, eq(avaliableIn.domain, domains.identifier))
      .where(eq(avaliableIn.subjectOf, sku))
      .all(),
  ]);

  const isAvaliable = avaliability.some(({ identifier }) =>
    url.hostname.endsWith(identifier)
  );

  return isAvaliable
    ? productsObject(
      {
        productBase: { ...productBase, sku },
        additionalProperty,
        description,
        image,
        video,
        category: category.rows as unknown as Category[],
        avaliability,
        url,
        skuAsSlug: true,
      },
    )
    : null;
}

export async function getProductBySlug(
  slug: string,
  ctx: AppContext,
  url: URL,
): Promise<Product | null> {
  const records = await ctx.invoke.records.loaders.drizzle();
  const productBase = await records
    .select({
      sku: products.sku,
      name: products.name,
      productID: products.productID,
      description: products.description,
      gtin: products.gtin,
      releaseDate: products.releaseDate,
      brand_name: brands.name,
      brand_id: brands.identifier,
    })
    .from(products)
    .innerJoin(brands, eq(products.brand, brands.identifier))
    .where(eq(products.productID, slug))
    .get();

  if (!productBase) {
    return null;
  }

  const [
    additionalProperty,
    description,
    image,
    video,
    category,
    avaliability,
  ] = await Promise.all([
    records
      .select()
      .from(additionalProperties)
      .where(eq(additionalProperties.subjectOf, productBase.sku))
      .all(),

    records
      .select()
      .from(descriptions)
      .where(eq(descriptions.subjectOf, productBase.sku))
      .all(),

    records
      .select()
      .from(images)
      .where(eq(images.subjectOf, productBase.sku))
      .all(),

    records
      .select()
      .from(videos)
      .where(eq(videos.subjectOf, productBase.sku))
      .all(),

    records.run(sql`
        WITH RECURSIVE CategoryHierarchy AS (
          SELECT
            c.identifier,
            c.value,
            c.subjectOf
          FROM
            productCategories AS pc
            INNER JOIN categories AS c ON pc.subjectOf = c.identifier
          WHERE
            pc.product = ${productBase.sku}
          UNION
          SELECT
            parent.identifier,
            parent.value,
            parent.subjectOf
          FROM
            categories AS parent
            INNER JOIN CategoryHierarchy AS child ON child.subjectOf = parent.identifier
        )
        SELECT
          *
        FROM
          CategoryHierarchy
        `),

    records
      .select({
        identifier: domains.identifier,
        description: domains.description,
      })
      .from(avaliableIn)
      .innerJoin(domains, eq(avaliableIn.domain, domains.identifier))
      .where(eq(avaliableIn.subjectOf, productBase.sku))
      .all(),
  ]);

  const isAvaliable = avaliability.some(({ identifier }) =>
    url.hostname.endsWith(identifier)
  );

  console.log(url.hostname);
  console.log(isAvaliable);

  return isAvaliable
    ? productsObject(
      {
        productBase,
        additionalProperty,
        description,
        image,
        video,
        category: category.rows as unknown as Category[],
        avaliability,
        url,
      },
    )
    : null;
}

function productsObject(
  {
    productBase,
    additionalProperty,
    description,
    category,
    avaliability,
    image,
    video,
    url,
    skuAsSlug,
  }: {
    productBase: ProductBase;
    additionalProperty: AdditionalProperty[];
    description: Description[];
    category: Category[];
    avaliability: Avaliability[];
    image: Image[];
    video: Video[];
    url: URL;
    skuAsSlug?: boolean;
  },
): Product {
  const productUrl = new URL(
    skuAsSlug ? `${productBase.sku}/p` : `${productBase.productID}/p`,
    url.origin,
  );

  return {
    "@type": "Product",
    name: productBase?.name,
    sku: productBase.sku,
    productID: productBase?.productID ?? "",
    gtin: productBase.gtin ?? undefined,
    releaseDate: productBase.releaseDate ?? undefined,
    description: productBase.description ?? undefined,
    url: productUrl.href,
    brand: {
      "@type": "Brand",
      name: productBase.brand_name,
      identifier: productBase.brand_id,
    },
    additionalProperty: [
      ...additionalProperty.map((prop) => ({
        "@type": "PropertyValue" as const,
        ...prop,
        subjectOf: prop.subjectOf ?? undefined,
        unitCode: prop.unitCode ?? undefined,
        unitText: prop.unitText ?? undefined,
        identifier: String(prop.identifier),
      })),
      ...description.map(({ name, value, image }) => (
        {
          "@type": "PropertyValue" as const,
          propertyID: "DESCRIPTION",
          name,
          value,
          image: [{
            "@type": "ImageObject" as const,
            url: image ?? undefined,
          }],
        }
      )),
      ...category.map(({ identifier, value, subjectOf }) => (
        {
          "@type": "PropertyValue" as const,
          propertyID: "CATEGORY",
          name: value,
          value: identifier,
          subjectOf,
        }
      )),
      ...avaliability.map(({ identifier, description }) => (
        {
          "@type": "PropertyValue" as const,
          propertyID: "AVALIABLEIN",
          name: description,
          value: String(identifier),
        }
      )),
    ],
    image: image?.map((i) => ({
      "@type": "ImageObject" as const,
      ...i,
      name: i.name ?? undefined,
      description: i.description ?? undefined,
      disambiguatingDescription: i.disambiguatingDescription ?? undefined,
      subjectOf: i.subjectOf ?? undefined,
      identifier: String(i.identifier),
      additionalType: i.additionalType ?? undefined,
    })),
    video: video?.map((v) => ({
      "@type": "VideoObject" as const,
      ...v,
      uploadDate: v.uploadDate ?? undefined,
      duration: v.duration ?? undefined,
      identifier: String(v.identifier),
      subjectOf: v.subjectOf ?? undefined,
    })),
  };
}
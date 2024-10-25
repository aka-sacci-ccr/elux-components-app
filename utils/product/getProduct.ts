import { AppContext } from "apps/records/mod.ts";
import {
  additionalProperties,
  brands,
  descriptions,
  images,
  products,
  videos,
} from "../../db/schema.ts";
import { eq } from "drizzle-orm";
import { Product } from "apps/commerce/types.ts";

export async function getProductBySku(
  sku: string,
  ctx: AppContext,
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

  const additionalProperty = await records
    .select()
    .from(additionalProperties)
    .where(eq(additionalProperties.subjectOf, sku))
    .all();

  const description = await records
    .select()
    .from(descriptions)
    .where(eq(descriptions.subjectOf, sku))
    .all();

  const image = await records
    .select()
    .from(images)
    .where(eq(images.subjectOf, sku))
    .all();

  const video = await records
    .select()
    .from(videos)
    .where(eq(videos.subjectOf, sku))
    .all();

  return {
    "@type": "Product",
    name: productBase?.name,
    sku,
    productID: productBase?.productID ?? "",
    gtin: productBase.gtin ?? undefined,
    releaseDate: productBase.releaseDate ?? undefined,
    description: productBase.description ?? undefined,
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
      ...description.map(({ name, value, image }) => {
        return {
          "@type": "PropertyValue" as const,
          propertyID: "DESCRIPTION",
          name,
          value,
          image: [{
            "@type": "ImageObject" as const,
            url: image ?? undefined,
          }],
        };
      }),
    ],
    image: image?.map((i) => ({
      "@type": "ImageObject" as const,
      ...i,
      name: i.name ?? undefined,
      description: i.description ?? undefined,
      disambiguatingDescription: i.disambiguatingDescription ?? undefined,
      subjectOf: i.subjectOf ?? undefined,
      identifier: String(i.identifier),
      additionalType: i.additionalType ? "BANNER" : "IMAGE",
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

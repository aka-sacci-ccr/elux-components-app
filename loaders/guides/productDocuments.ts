import { Product } from "apps/commerce/types.ts";
import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { AppContext } from "../../mod.ts";
import { AppContext as RecordsAppContext } from "apps/records/mod.ts";
import { BaseImage, BaseProduct, UrlComposing } from "./products.ts";
import {
  avaliableIn,
  images,
  productDocuments,
  products,
} from "../../db/schema.ts";
import { and, eq, inArray, sql } from "drizzle-orm";
import { logger } from "@deco/deco/o11y";
import { GUIDE_PROPERTY_ID } from "../../utils/product/constants.ts";

interface ProductDocuments {
  identifier: number;
  subjectOf: string;
  url: string;
  name: string;
  alternateName?: string | null;
  language: string;
}

interface Props {
  /**
   * @title SLUG from URL
   */
  slug: RequestURLParam;
  /**
   * @title Get Product By
   * @description Select an attribute to get the product
   */
  getBy?: UrlComposing;
}

export default async function loader(
  {
    slug,
    getBy = "modelCode",
  }: Props,
  req: Request,
  ctx: AppContext & RecordsAppContext,
): Promise<Product | null> {
  const url = new URL(req.url);
  const records = await ctx.invoke.records.loaders.drizzle();
  const { language } = ctx;
  try {
    const baseProduct = await records.select({
      name: products.name,
      alternateName: products.alternateName,
      productID: products.productID,
      url: products.url,
      sku: products.sku,
      gtin: products.gtin,
    }).from(products)
      .leftJoin(
        avaliableIn,
        eq(products.sku, avaliableIn.subjectOf),
      )
      .where(
        and(
          eq(fieldsToOrder[getBy], slug),
          sql`${url.hostname} LIKE '%' || ${avaliableIn.domain}`,
        ),
      )
      .limit(1).get() as unknown as BaseProduct;

    if (!baseProduct) {
      return null;
    }

    const [productImages, productDocs] = await Promise.all(
      [
        records
          .select()
          .from(images)
          .where(
            and(
              eq(
                images.subjectOf,
                baseProduct.sku,
              ),
              eq(images.additionalType, "PRODUCT_IMAGE"),
            ),
          )
          .all() as unknown as BaseImage[],
        records
          .select()
          .from(productDocuments)
          .where(and(
            eq(
              productDocuments.subjectOf,
              baseProduct.sku,
            ),
            inArray(productDocuments.language, [language, "both"]),
          )) as unknown as ProductDocuments[],
      ],
    );

    return {
      "@type": "Product",
      name: language === "EN"
        ? baseProduct.alternateName ?? baseProduct.name
        : baseProduct.name,
      sku: baseProduct.sku,
      productID: baseProduct.productID ?? "",
      gtin: baseProduct.gtin ?? undefined,
      image: productImages
        .filter((i) => i.subjectOf === baseProduct.sku)
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
      additionalProperty: productDocs.map((
        { url, name, alternateName },
      ) => ({
        "@type": "PropertyValue",
        propertyID: GUIDE_PROPERTY_ID,
        url,
        name: language === "EN" ? alternateName ?? name : name,
      })),
    };
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export const cache = "stale-while-revalidate";

export const cacheKey = ({ slug, getBy = "modelCode" }: Props) => {
  return `product-documents-${slug}-composeUrl-${getBy}`;
};

const fieldsToOrder = {
  "slug": products.url,
  "sku": products.sku,
  "modelCode": products.productID,
  "gtin": products.gtin,
};
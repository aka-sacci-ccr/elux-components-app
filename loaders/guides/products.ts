import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { AppContext } from "../../mod.ts";
import { AppContext as RecordsAppContext } from "apps/records/mod.ts";
import { Product } from "apps/commerce/types.ts";
import { getCategoryTree } from "../../utils/product/getProduct.ts";
import {
  avaliableIn,
  images,
  productCategories,
  products,
} from "../../db/schema.ts";
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { logger } from "@deco/deco/o11y";
interface Props {
  /**
   * @title SLUG from URL
   */
  slug: RequestURLParam;
  /**
   * @title Sort By
   * @description Sort option of the products
   */
  sortBy?: "name-asc" | "name-desc";
  /**
   * @title Attribute to compose URL
   * @description Select an attribute to compose the product url
   */
  urlComposing?: UrlComposing;
}

type UrlComposing = "slug" | "sku" | "productId" | "gtin";

interface BaseProduct {
  name: string;
  alternateName?: string | null;
  productID: string;
  url: string;
  sku: string;
  gtin: string | null;
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
  { slug, sortBy = "name-asc", urlComposing = "slug" }: Props,
  req: Request,
  ctx: AppContext & RecordsAppContext,
): Promise<Product[] | null> {
  const url = new URL(req.url);
  const records = await ctx.invoke.records.loaders.drizzle();
  const categoryBranch = await getCategoryTree(records, slug);
  const { language } = ctx;
  try {
    const orderClause = language === "EN"
      ? products.alternateName
      : products.name;

    const baseProducts = await records.select({
      name: products.name,
      alternateName: products.alternateName,
      productID: products.productID,
      url: products.url,
      sku: products.sku,
      gtin: products.gtin,
    }).from(productCategories)
      .innerJoin(
        products,
        eq(productCategories.product, products.sku),
      )
      .leftJoin(
        avaliableIn,
        eq(productCategories.product, avaliableIn.subjectOf),
      )
      .where(
        and(
          inArray(
            productCategories.subjectOf,
            categoryBranch.map((c) => c.identifier),
          ),
          sql`${url.hostname} LIKE '%' || ${avaliableIn.domain}`,
        ),
      )
      .groupBy(products.sku)
      .orderBy(
        sortBy === "name-asc" ? asc(orderClause) : desc(orderClause),
      ) as unknown as BaseProduct[];

    if (!baseProducts || baseProducts.length === 0) {
      return null;
    }

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
      .all() as unknown as BaseImage[];

    return baseProducts.map<Product>((p) => {
      return {
        "@type": "Product",
        name: language === "EN" ? p.alternateName ?? p.name : p.name,
        sku: p.sku,
        productID: p.productID ?? "",
        gtin: p.gtin ?? undefined,
        url: new URL(
          `guides-and-manuals/${pickUrlComposed(p, urlComposing)}/p`,
          url.origin,
        ).href,
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
      };
    });
  } catch (e) {
    logger.error(e);
    return null;
  }
}

const pickUrlComposed = (product: BaseProduct, urlComposing: UrlComposing) => {
  if (urlComposing === "slug") {
    return product.url;
  }
  if (urlComposing === "sku") {
    return product.sku;
  }
  if (urlComposing === "productId") {
    return product.productID;
  }
  if (urlComposing === "gtin") {
    return product.gtin;
  }
};

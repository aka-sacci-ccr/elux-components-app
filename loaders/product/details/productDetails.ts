import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { AppContext } from "apps/records/mod.ts";
import {
  ListItem,
  ProductDetailsPage,
  PropertyValue,
} from "apps/commerce/types.ts";
import {
  getProductBySku,
  getProductBySlug,
} from "../../../utils/product/getProduct.ts";
export interface Props {
  /**
   * @title SLUG from URL
   */
  slug: RequestURLParam;
  /**
   * @description Use SKU as product SLUG
   */
  useSkuAsSlug?: boolean;
}

export default async function loader(
  { slug, useSkuAsSlug }: Props,
  req: Request,
  ctx: AppContext,
): Promise<ProductDetailsPage | null> {
  const url = new URL(req.url);
  const product = useSkuAsSlug
    ? await getProductBySku(slug, ctx, url)
    : await getProductBySlug(slug, ctx, url);

  if (!product) {
    return null;
  }

  const categories = product.additionalProperty?.filter(({ propertyID }) =>
    propertyID === "CATEGORY"
  );

  const itemListElement = getBreadcrumbList(url, categories);

  return {
    "@type": "ProductDetailsPage",
    product,
    breadcrumbList: {
      "@type": "BreadcrumbList",
      itemListElement,
      numberOfItems: itemListElement.length,
    },
    seo: {
      title: product.name!,
      description: product.description ?? "",
      canonical: product.url ?? "",
    },
  };
}

function getBreadcrumbList(
  url: URL,
  categories?: PropertyValue[],
): ListItem[] {
  if (!categories) return [];

  //Recursive
  const buildUrl = (cat: PropertyValue): string => {
    const parent = categories.find((c) => c.value === cat.subjectOf);
    return parent ? `${buildUrl(parent)}/${cat.value}` : cat.value ?? "";
  };

  return categories.map((category) => {
    const categoryUrl = buildUrl(category);
    return {
      "@type": "ListItem",
      item: category.name ?? "",
      url: new URL(categoryUrl, url.origin).href,
      position: categoryUrl.split("/").length,
    };
  });
}

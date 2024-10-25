import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { AppContext } from "apps/records/mod.ts";
import { Product } from "apps/commerce/types.ts";
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
): Promise<Product | null> {
  const url = new URL(req.url);
  const result = useSkuAsSlug
    ? await getProductBySku(slug, ctx, url)
    : await getProductBySlug(slug, ctx, url);
  return result;
}

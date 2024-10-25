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
  _req: Request,
  ctx: AppContext,
): Promise<Product | null> {
  const result = useSkuAsSlug
    ? await getProductBySku(slug, ctx)
    : await getProductBySlug(slug, ctx);
  return result;
}

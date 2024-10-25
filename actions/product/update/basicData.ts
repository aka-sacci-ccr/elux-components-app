import { AppContext } from "apps/records/mod.ts";
import { updateBaseData } from "../../../utils/product/submitProduct.ts";
import { Product as DatabaseProduct } from "../../../utils/types.ts";
import { logger } from "@deco/deco/o11y";
import { getProductBySku } from "../../../utils/product/getProduct.ts";
import { Product } from "apps/commerce/types.ts";

export interface Props extends Partial<DatabaseProduct> {
  /**
   * @title Sku
   * @format dynamic-options
   * @options elux-components-app/loaders/product/avaliableSkus.ts
   */
  sku: string;
}

/**
 * @description Blank data will not be changed
 */
export default async function basicData(
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Product | { success: boolean; message: string }> {
  const productBrand = props?.brand?.split("---");
  const url = new URL(req.url);
  try {
    await updateBaseData({
      ...props,
      brand: productBrand ? productBrand[0] ?? undefined : undefined,
    }, ctx);

    const product = await getProductBySku(props.sku, ctx, url);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: e.message,
    };
  }
}

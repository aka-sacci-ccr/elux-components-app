import { logger } from "@deco/deco/o11y";
import withPassword from "../../../utils/auth/withPassword.ts";
import { addCategories } from "../../../utils/product/submitProduct.ts";
import { ProductCategory } from "../../../utils/types.ts";
import { AppContext } from "../../../mod.ts";
import { Category as CategoryFromDatabase } from "../../../utils/product/getProduct.ts";

export interface Props {
  password: string;
  /**
   * @title Sku
   * @description This action will add new additional properties to the product. No additional properties will be removed or overwritten.
   * @format dynamic-options
   * @options elux-components-app/loaders/product/avaliableSkus.ts
   */
  sku: string;
  /**
   * @title Categories
   */
  categories: ProductCategory[];
}

export default async function addProductCategories(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<CategoryFromDatabase[] | { success: boolean; message: string }> {
  withPassword(props, ctx);
  try {
    const categories = await addCategories(props.categories, props.sku, ctx);
    return categories;
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

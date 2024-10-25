import { AvaliableIn } from "../../utils/types.ts";
import {
  AdditionalProperty,
  Description,
  ImageProduct,
  Product as BaseProduct,
  ProductCategory,
  Video,
} from "../../utils/types.ts";
import { AppContext } from "apps/records/mod.ts";
import { logger } from "@deco/deco/o11y";
import { insertProduct } from "../../utils/product/submitProduct.ts";

export interface Props {
  /**
   * @title Base info
   */
  product: BaseProduct;
  categories: ProductCategory[];
  additionalProperties: AdditionalProperty[];
  descriptions: Description[];
  images: ImageProduct[];
  videos?: Video[];
  avaliableIn: AvaliableIn[];
}

export default async function submit(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<{ success: boolean; message?: string }> {
  try {
    await insertProduct({ ...props, ctx });
    return {
      success: true,
    };
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: e.message,
    };
  }
}

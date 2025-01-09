import { AvaliableIn, ProductDocument } from "../../utils/types.ts";
import {
  AdditionalProperty,
  Description,
  ImageProduct,
  Product as BaseProduct,
  ProductCategory,
  ProductMeasurements,
  Video,
} from "../../utils/types.ts";
import { logger } from "@deco/deco/o11y";
import { insertProduct } from "../../utils/product/submitProduct.ts";
import { AppContext } from "../../mod.ts";
import withPassword from "../../utils/auth/withPassword.ts";

export interface Props {
  password: string;
  /**
   * @title Base info
   */
  product: BaseProduct;
  /**
   * @title Categories
   */
  categories: ProductCategory[];
  /**
   * @title Measurements
   */
  measurements: ProductMeasurements[];
  /**
   * @title Additional Properties
   */
  additionalProperties: AdditionalProperty[];
  /**
   * @title Descriptions
   */
  descriptions: Description[];
  /**
   * @title Images
   */
  images: ImageProduct[];
  /**
   * @title Videos
   */
  videos?: Video[];
  /**
   * @title Avaliability
   */
  avaliableIn: AvaliableIn[];
  /**
   * @title Documents
   */
  documents?: ProductDocument[];
}

export default async function submit(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<{ success: boolean; message?: string }> {
  withPassword(props, ctx);
  try {
    await insertProduct({ ...props, ctx });
    return {
      success: true,
    };
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

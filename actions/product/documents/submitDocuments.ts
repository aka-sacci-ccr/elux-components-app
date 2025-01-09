import { insertDocuments } from "../../../utils/product/submitProduct.ts";
import { ProductDocument } from "../../../utils/types.ts";
import { logger } from "@deco/deco/o11y";
import { productDocuments } from "../../../db/schema.ts";
import { eq } from "drizzle-orm";
import { AppContext } from "../../../mod.ts";
import withPassword from "../../../utils/auth/withPassword.ts";
export interface Props {
  password: string;
  /**
   * @title Sku
   * @format dynamic-options
   * @options elux-components-app/loaders/product/avaliableSkus.ts
   */
  sku: string;
  /**
   * @title Documents
   */
  documents: ProductDocument[];
}

/**
 * @title Update documents
 * @description Blank data will not be changed
 */
export default async function submitDocuments(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<ProductDocument[] | { success: boolean; message: string }> {
  withPassword(props, ctx);
  const records = await ctx.invoke.records.loaders.drizzle();
  try {
    await insertDocuments(props.documents, props.sku, ctx);
    const productDocs = await records
      .select()
      .from(productDocuments)
      .where(eq(productDocuments.subjectOf, props.sku));
    return productDocs as ProductDocument[];
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

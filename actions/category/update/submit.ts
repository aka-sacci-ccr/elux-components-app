import { AppContext } from "apps/records/mod.ts";
import { categories } from "../../../db/schema.ts";
import { eq } from "drizzle-orm";
import { logger } from "@deco/deco/o11y";
import { Category } from "../../../utils/types.ts";

export interface Props extends Omit<Category, "identifier"> {
  /**
   * @title Category
   * @description Select a category to update.
   * @format dynamic-options
   * @options elux-components-app/loaders/product/avaliableCategories.ts
   */
  categoryIdentifier: string;
}

export default async function submit(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const { categoryIdentifier, ...rest } = props;
  const records = await ctx.invoke.records.loaders.drizzle();

  try {
    const identifier = categoryIdentifier ? categoryIdentifier.split("---")[0] : undefined;
    console.log(rest);
    await records.update(categories).set({
      ...rest,
    }).where(eq(categories.identifier, identifier));
    return {
      success: true,
      identifier,
      ...rest,
    };
  } catch (error) {
    logger.error(error);
    return {
      success: false,
    };
  }
}

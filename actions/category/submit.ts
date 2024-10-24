import { AppContext } from "apps/records/mod.ts";
import { Category } from "../../utils/types.ts";
import { categories } from "../../db/schema.ts";
import { logger } from "@deco/deco/o11y";

export default async function submit(
  { subjectOf, ...props }: Category,
  _req: Request,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  const category = subjectOf?.split("---");
  try {
    const additionalType = category ? category[2] : "1";
    const subjectOf = category ? category[0] : undefined;
    await records.insert(categories).values({
      ...props,
      additionalType,
      subjectOf,
    });
    return {
      additionalType,
      subjectOf,
      ...props,
    };
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: e.message,
    };
  }
}

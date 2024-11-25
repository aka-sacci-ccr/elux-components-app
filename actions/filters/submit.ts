import { AppContext } from "apps/records/mod.ts";
import { FiltersGroups } from "../../utils/types.ts";
import { logger } from "@deco/deco/o11y";
import { filtersGroups } from "../../db/schema.ts";

export interface Props {
  filtersGroups: FiltersGroups[];
}

export default async function submit(
  { filtersGroups: filters }: Props,
  _req: Request,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();

  try {
    if (filters.length === 0) {
      throw new Error("No filters groups to insert");
    }
    await records.insert(filtersGroups).values(filters);

    return {
      success: true,
      data: filters,
    };
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: e,
    };
  }
}

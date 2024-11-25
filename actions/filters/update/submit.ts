import { AppContext } from "apps/records/mod.ts";
import { filtersGroups } from "../../../db/schema.ts";
import { eq } from "drizzle-orm";
import { logger } from "@deco/deco/o11y";

export interface Props {
  /**
   * @title Filter Group
   * @description To use this property as a filter, you need to select a filter group.
   * @format dynamic-options
   * @options elux-components-app/loaders/product/avaliableFiltersGroups.ts
   */
  filterIdentifier: string;
  /**
   * @title Spanish Name
   */
  name: string;
  /**
   * @title English Name
   */
  alternateName: string;
}

export default async function submit(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const { filterIdentifier, ...rest } = props;
  const records = await ctx.invoke.records.loaders.drizzle();

  try {
    await records.update(filtersGroups).set({
      ...rest,
    }).where(eq(filtersGroups.identifier, filterIdentifier));
    return {
      success: true,
      filterIdentifier,
      ...rest,
    };
  } catch (error) {
    logger.error(error);
    return {
      success: false,
    };
  }
}

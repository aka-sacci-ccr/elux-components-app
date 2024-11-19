import { allowCorsFor, type FnContext } from "@deco/deco";
import { AppContext as RecordsContext } from "apps/records/mod.ts";
import { filtersGroups } from "../../db/schema.ts";

export default async function availableFiltersGroups(
  _props: unknown,
  req: Request,
  ctx: FnContext,
) {
  // Allow Cors
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });

  const recordsCtx = ctx as unknown as RecordsContext;
  const records = await recordsCtx.invoke.records.loaders.drizzle();

  const allFiltersGroups = await records.select({
    identifier: filtersGroups.identifier,
    name: filtersGroups.name,
    alternateName: filtersGroups.alternateName,
  }).from(filtersGroups);

  return allFiltersGroups.map(({ identifier, name, alternateName }) => ({
    label: alternateName
      ? `${identifier} - (${name} / ${alternateName})`
      : name,
    value: identifier,
  }));
}

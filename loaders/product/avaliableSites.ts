import { allowCorsFor, type FnContext } from "@deco/deco";
import { AppContext as RecordsContext } from "apps/records/mod.ts";
import { siteNames } from "../../db/schema.ts";

export default async function avaliableSites(
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

  const allSites = await records.select({
    identifier: siteNames.identifier,
    name: siteNames.name,
  }).from(siteNames);

  return allSites.map(({ identifier, name }) => ({
    label: name,
    value: `${identifier}---${name}`,
  }));
}

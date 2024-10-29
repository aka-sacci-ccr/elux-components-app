import { allowCorsFor, type FnContext } from "@deco/deco";
import { AppContext as RecordsContext } from "apps/records/mod.ts";
import { domains } from "../../db/schema.ts";

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
    identifier: domains.identifier,
    name: domains.description,
  }).from(domains);

  return allSites.map(({ identifier, name }) => ({
    label: `${name} (${identifier})`,
    value: identifier,
  }));
}

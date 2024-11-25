import { allowCorsFor, type FnContext } from "@deco/deco";
import { AppContext as RecordsContext } from "apps/records/mod.ts";
import { categories } from "../../db/schema.ts";

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

  const allCategories = await records.select({
    identifier: categories.identifier,
    value: categories.value,
    additionalType: categories.additionalType,
  }).from(categories);

  return allCategories.map(({ identifier, value, additionalType }) => ({
    label: `${value} (/${identifier}, Level ${additionalType})`,
    value: `${identifier}---${value}---${additionalType}`,
  }));
}

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
    name: categories.name,
    alternateName: categories.alternateName,
    additionalType: categories.additionalType,
    subjectOf: categories.subjectOf,
  }).from(categories);

  return allCategories.map((
    { identifier, name, additionalType, subjectOf },
  ) => ({
    label: `/${
      [subjectOf, identifier].filter(Boolean).join("/")
    }, Level ${additionalType}`,
    value: `${identifier}---${name}---${additionalType}`,
  }));
}

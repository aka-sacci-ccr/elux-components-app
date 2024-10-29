import { allowCorsFor, type FnContext } from "@deco/deco";
import { AppContext as RecordsContext } from "apps/records/mod.ts";
import { products } from "../../db/schema.ts";

export default async function avaliableSkus(
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

  const allSkus = await records.select({
    sku: products.sku,
    name: products.name,
  }).from(products);

  return allSkus.map(({ sku, name }) => ({
    label: `${sku} - ${name}`,
    value: sku,
  }));
}

import { AppContext } from "apps/records/mod.ts";
import { domains } from "../../db/schema.ts";
import { logger } from "@deco/deco/o11y";

interface Props {
  identifier: string;
  description: string;
}

export default async function submit(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  try {
    await records.insert(domains).values({
      ...props,
    });
    return {
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

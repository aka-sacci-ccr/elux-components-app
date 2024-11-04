import { AppContext } from "apps/records/mod.ts";
import { AvaliableIn, Category } from "../../utils/types.ts";
import { categories } from "../../db/schema.ts";
import { logger } from "@deco/deco/o11y";
import { categoryAvaliableIn } from "../../db/schema.ts";
import { DEFAULT_DOMAINS } from "../../utils/constants.tsx";

export default async function submit(
  { subjectOf, avaliablility, ...props }: Category & {
    avaliablility: AvaliableIn[];
  },
  _req: Request,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  const category = subjectOf?.split("---");
  try {
    const additionalType = category ? String(Number(category[2]) + 1) : "1";
    const subjectOf = category ? category[0] : undefined;
    //Insert category
    await records.insert(categories).values({
      ...props,
      additionalType,
      subjectOf,
    });
    //Insert category avaliability
    await records.insert(categoryAvaliableIn).values(
      [
        ...avaliablility.map(({ domain }) => ({
          domain,
          subjectOf: props.identifier,
        })),
        ...DEFAULT_DOMAINS.map((domain) => ({
          domain,
          subjectOf: props.identifier,
        })),
      ],
    );
    return {
      additionalType,
      subjectOf,
      ...props,
    };
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: e,
    };
  }
}

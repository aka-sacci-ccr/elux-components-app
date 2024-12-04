import { and, eq, notInArray, or } from "drizzle-orm";
import { categories } from "../../db/schema.ts";
import { AppContext } from "../../mod.ts";
import { AppContext as RecordsContext } from "apps/records/mod.ts";
import { Category } from "../../utils/types.ts";
import { AvailableIcons } from "../../components/ui/Icon.tsx";

export interface CategoryFather {
  categoryName: string;
  categoryId: string;
  categoryChildren: CategoryChild[];
}

export interface CategoryChild {
  name: string;
  url: string;
  icon?: AvailableIcons | null;
}

interface Props {
  /**
   * @title Exclude categories
   * @description Insert categories to exclude.
   */
  excludeCategories?: string[];
}

/**
 * @title Get categories and level 2 subcategories
 * @description Get the categories and level 2 subcategories.
 *
 * @param props - Define the categories to exclude.
 * @param req - The request object.
 * @param ctx - The application context.
 * @returns A promise that resolves to an array of categories and level 2 subcategories.
 */
export default async function loader(
  { excludeCategories }: Props,
  req: Request,
  ctx: AppContext & RecordsContext,
): Promise<CategoryFather[]> {
  const url = new URL(req.url);
  const { language } = ctx;
  const records = await ctx.invoke.records.loaders.drizzle();
  const categoriesFromDatabase = await records.select().from(categories)
    .where(
      and(
        or(
          eq(categories.additionalType, "1"),
          eq(categories.additionalType, "2"),
        ),
        (excludeCategories && excludeCategories.length > 0) &&
          notInArray(categories.identifier, excludeCategories),
      ),
    ) as (Category & { additionalType: "1" | "2" })[];
  const fatherCategories = categoriesFromDatabase.filter(
    (category) => category.additionalType === "1",
  );
  const groupedCategories = fatherCategories.map((category) => ({
    categoryName: language === "EN"
      ? category.alternateName ?? category.name
      : category.name,
    categoryId: category.identifier,
    categoryChildren: categoriesFromDatabase.reduce<CategoryChild[]>(
      (acc, child) => {
        if (
          child.additionalType === "2" &&
          child.subjectOf === category.identifier
        ) {
          return [...acc, {
            name: language === "EN"
              ? child.alternateName ?? child.name
              : child.name,
            url: new URL(
              `guides-and-manuals/${child.identifier}`,
              url.origin,
            ).href,
            icon: child.thumbnail,
          }];
        }
        return acc;
      },
      [],
    ),
  }));
  return groupedCategories;
}

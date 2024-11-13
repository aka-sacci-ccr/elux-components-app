import { ProductListingPage } from "apps/commerce/types.ts";
import { AppContext } from "apps/records/mod.ts";
import { sql } from "drizzle-orm";
import { Category } from "../../../utils/types.ts";
import { LibSQLDatabase } from "apps/records/deps.ts";

interface ExtendedCategory extends Category {
  additionalType?: string;
}

export default async function loader(
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<ProductListingPage | null> {
  const url = new URL(req.url);
  const records = await ctx.invoke.records.loaders.drizzle();
  const paths = url.pathname.split("/").splice(1);
  const fatherCategoryPath = paths[0];
  const categories = await getCategories(records, fatherCategoryPath);

  if (!isPathRight(paths, categories)) {
    console.log("path is wrong");
    return null;
  }
  const validCategory = categories.find(({ identifier }) =>
    identifier === paths[paths.length - 1]
  );

  const categoriesToBeReturned = validCategory?.additionalType === "1"
    ? categories.map(({ identifier }) => identifier)
    : getCategoriesToBeReturned(categories, validCategory!);

  console.log(categoriesToBeReturned);

  return null;
}

const getCategoriesToBeReturned = (
  categories: ExtendedCategory[],
  validCategory: ExtendedCategory,
): string[] => {
  const getChildIdentifiers = (parentIds: string[]): string[] =>
    parentIds.length === 0 ? [] : [
      ...parentIds,
      ...getChildIdentifiers(
        categories
          .filter((cat) => parentIds.includes(cat.subjectOf ?? ""))
          .map((cat) => cat.identifier),
      ),
    ];

  return getChildIdentifiers([validCategory.identifier]);
};

//Get category father hierarchy
const getCategories = async (
  records: LibSQLDatabase<Record<string, never>>,
  fatherCategoryPath: string,
) =>
  await records.run(sql`
    WITH RECURSIVE
    CategoryTree AS (
      SELECT
        identifier,
        value,
        description,
        additionalType,
        subjectOf,
        image
      FROM
        categories
      WHERE
        identifier = ${fatherCategoryPath}
      UNION ALL
      SELECT
        c.identifier,
        c.value,
        c.description,
        c.additionalType,
        c.subjectOf,
        c.image
      FROM
        categories c
        INNER JOIN CategoryTree ct ON c.subjectOf = ct.identifier
    )
  SELECT
    *
  FROM
    CategoryTree;
    `).then((result) => result.rows) as unknown as ExtendedCategory[];

//Checks if the URL follows the right hierarchy
const isPathRight = (paths: string[], categories: ExtendedCategory[]) =>
  paths.reduce(
    (acc, p, index) => {
      if (acc === false) {
        return false;
      }
      const category = categories.find(({ identifier }) => identifier === p);
      if (
        category &&
        ((index === 0 && category.additionalType === "1") ||
          category.subjectOf === paths[index - 1])
      ) {
        return true;
      }
      return false;
    },
    true,
  );

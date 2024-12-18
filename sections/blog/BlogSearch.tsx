import { Category } from "apps/blog/types.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";
import { AppContext } from "../../mod.ts";
import { clx } from "../../utils/clx.ts";
import { type SectionProps } from "@deco/deco";

interface Props {
  /**
   * @title Category section
   */
  categorySection: CategorySection;
  /**
   * @title Search section
   */
  searchSection: SearchSection;
  /**
   * @title Spacing config
   */
  spacing: SpacingConfig;
}

interface CategorySection {
  /**
   * @title Category section title
   */
  title: string;
  /**
   * @title Blog categories
   */
  categories: Category[] | null;
}

interface SearchSection {
  /**
   * @title Search section title
   */
  title: string;
  /**
   * @title Clear text
   */
  clearText: string;
  /**
   * @title Search placeholder
   */
  placeholder: string;
  /**
   * @title Search button text
   */
  searchButtonText: string;
}

export async function loader(props: Props, _req: Request, ctx: AppContext) {
  const { siteTemplate } = ctx;
  await 0;
  /*   const url = new URL(req.url);
  const pageResolverId = ctx.resolverId?.split("@")[0];

  const resolvables: Record<string, Resolvable<{ path: string }>> = await ctx
    .get({
      __resolveType: "resolvables",
    });

  const current = Object.entries(resolvables).find(([key]) => {
    return key === pageResolverId;
  });

  //console.log(current); */
  return { ...props, siteTemplate };
}

export default function BlogSearch(props: SectionProps<typeof loader>) {
  const { categorySection, spacing, siteTemplate } = props;
  const { container, categoryStyling } = siteTemplate === "elux"
    ? ELUX_STYLING
    : FRIGIDAIRE_STYLING;
  return (
    <Container
      spacing={spacing}
      class="container px-6 lg:px-0"
    >
      <div class={clx("px-4 py-6 flex flex-col", container)}>
        {categorySection.categories && categorySection.categories.length > 0 &&
          (
            <div class="flex flex-col gap-2">
              <p class={categoryStyling.title}>{categorySection.title}</p>
              <div class="flex flex-row flex-wrap gap-2">
                {categorySection.categories.map((category, index) => (
                  <label
                    class={clx(
                      categoryStyling.button,
                      "h-[34px] leading-3 content-center cursor-pointer",
                      "has-[:checked]:cursor-default has-[:checked]:pointer-events-none",
                    )}
                  >
                    <input
                      type="radio"
                      name="blog-category"
                      value={index}
                      class="peer hidden"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
      </div>
    </Container>
  );
}

const ELUX_STYLING = {
  container: "bg-base-content border border-[#DEE7EA]",
  categoryStyling: {
    title: "text-sm text-primary font-medium",
    button:
      "text-sm text-primary font-medium px-3 rounded-[40px] border border-primary has-[:checked]:bg-primary has-[:checked]:text-white hover:bg-primary hover:text-white",
  },
};

const FRIGIDAIRE_STYLING = {
  container: "bg-base-300 border border-base-200",
  categoryStyling: {
    title: "text-sm text-primary font-bold",
    button: "text-sm text-primary font-bold p-4 rounded-[40px]",
  },
};

export const LoadingFallback = (
  { spacing }: Partial<Props>,
) => {
  return (
    <Container
      spacing={spacing}
      class="container px-6 lg:px-0 flex justify-center items-center"
    >
      <div class="h-64 lg:h-128 content-center">
        <span class="loading loading-lg loading-spinner text-primary" />
      </div>
    </Container>
  );
};

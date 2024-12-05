import { CategoryFather } from "../../loaders/guides/categories.ts";
import { useId } from "../../sdk/useId.ts";
import { clx } from "../../utils/clx.ts";
import Icon from "../ui/Icon.tsx";
import SubcategoryCard from "./SubcategoryCard.tsx";

interface Props {
  category: CategoryFather;
  siteTemplate: "elux" | "frigidaire";
}

export default function Collapsible({ category, siteTemplate }: Props) {
  const id = useId();
  return (
    <div class="collapse collapse-plus rounded-none">
      <input
        class="hidden peer"
        type="checkbox"
        id={id}
      />

      <label htmlFor={id} class="py-4 cursor-pointer">
        <div class="collapse-title min-h-0 py-0 px-6">
          <div
            class={clx(
              "flex items-center justify-between h-full w-full",
            )}
          >
            <p class={ELUX_STYLING.title}>
              {category.categoryName}
            </p>
            <Icon
              id="chevron-down-frigidaire"
              class={clx(
                "ml-auto text-primary arrow pointer-events-none",
                ELUX_STYLING.arrow,
              )}
            />
          </div>
        </div>
      </label>

      <div class="collapse-content !p-0 font-light">
        {/* Category cards */}
        <div class="grid grid-cols-2 pt-2 px-6 gap-4 pb-6 lg:grid-cols-4 lg:pr-16">
          {category.categoryChildren.map((subcategory) => (
            <SubcategoryCard
              subcategory={subcategory}
              siteTemplate={siteTemplate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const ELUX_STYLING = {
  title: "text-primary font-medium",
  arrow: "text-primary",
};

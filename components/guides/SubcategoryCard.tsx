import { CategoryChild } from "../../loaders/guides/categories.ts";
import { clx } from "../../utils/clx.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  subcategory: CategoryChild;
  siteTemplate: "elux" | "frigidaire";
}

export default function SubcategoryCard({ subcategory }: Props) {
  return (
    <a
      class={clx(
        "w-full h-[132px] flex flex-col gap-4 px-3.5 justify-center items-center",
        ELUX_STYLING.border,
      )}
      href={subcategory.url}
    >
      {subcategory.icon && (
        <Icon
          id={subcategory.icon}
          class={ELUX_STYLING.icon}
          width={40}
          height={40}
        />
      )}
      <p class={ELUX_STYLING.title}>{subcategory.name}</p>
    </a>
  );
}

const ELUX_STYLING = {
  border: "border border-[#DEE7EA]",
  icon: "text-primary",
  title: "text-sm text-secondary font-light text-center line-clamp-3",
};

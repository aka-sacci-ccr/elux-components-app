import { CategoryCard as CategoryCardType } from "../../sections/Content/CategoryCards.tsx";
import Icon from "./Icon.tsx";

type Props = CategoryCardType;

export default function CategoryCard({ title, icon, url }: Props) {
  return (
    <a
      href={url ?? "#"}
      class="flex flex-col gap-2 h-20 w-full md:h-[116px] pt-1 md:pt-5 bg-white rounded-sm border border-base-200 items-center"
    >
      <Icon id={icon} height={24} width={24} />
      <span class="text-xs md:text-base text-center px-1 font-light">
        {title}
      </span>
    </a>
  );
}

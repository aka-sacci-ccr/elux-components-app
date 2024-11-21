import Icon from "../../components/ui/Icon.tsx";
import { AvailableIcons } from "../../components/ui/Icon.tsx";
import { GAP_SIZES, TEXT_COLORS } from "../../utils/constants.tsx";
import { clx } from "../../utils/clx.ts";
import { Colors, FontSize, FontWeight } from "../../utils/types.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";
import { GapSizes } from "../../utils/types.ts";

export interface Props {
  /**
   * @title Icon
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon?: AvailableIcons;
  /**
   * @title Icon size
   */
  iconSize?: number;
  /**
   * @title Font color
   */
  fontColor: Colors;
  /**
   * @title Font size
   */
  fontSize: FontSize;
  /**
   * @title Font weight
   */
  fontWeight?: FontWeight;
  /**
   * @title Items
   */
  items: Items[];
  /**
   * @title GAP between items
   */
  gap?: GapSizes;
  disableContainer?: boolean;
  /**
   * @title Spacing config
   */
  spacing?: SpacingConfig;
}

interface Items {
  /**
   * @title Label
   */
  label: string;
  /**
   * @title Href
   */
  href?: string;
  /**
   * @title Override font color
   */
  overrideFontColor?: Colors;
  /**
   * @title Underline on hover
   */
  hoverUnderline?: boolean;
}

export default function Breadcrumb(
  {
    icon,
    fontColor,
    fontSize,
    spacing,
    iconSize = 16,
    items,
    fontWeight,
    gap,
    disableContainer,
  }: Props,
) {
  return (
    <Container
      spacing={spacing}
      class={clx("px-4 lg:px-0", !disableContainer && "container")}
    >
      <div
        class={clx(
          "flex flex-row items-center",
          TEXT_COLORS[fontColor ?? "primary"],
          fontWeight ?? "font-medium",
          fontSize,
          GAP_SIZES[gap ?? "2"],
        )}
      >
        {icon && (
          <>
            <a href="/">
              <Icon
                id={icon}
                size={iconSize}
                width={iconSize}
                height={iconSize}
              />
            </a>
            <Icon
              id="chevron-frigidaire"
              size={16}
              width={16}
              height={16}
              class="text-accent min-w-4"
            />
          </>
        )}
        {items.map(({ label, href, overrideFontColor, hoverUnderline }, i) => (
          <>
            <a
              href={href}
              class={clx(
                "last:line-clamp-1",
                overrideFontColor && TEXT_COLORS[overrideFontColor],
                hoverUnderline && "border-b-2 border-primary mt-0.5",
              )}
            >
              {label}
            </a>
            {i < items.length - 1 && (
              <Icon
                id="chevron-frigidaire"
                size={16}
                width={16}
                height={16}
                class="text-accent min-w-4"
              />
            )}
          </>
        ))}
      </div>
    </Container>
  );
}

import Icon from "../../components/ui/Icon.tsx";
import {
  BORDER_CLASSES,
  BORDER_COLORS,
  HOVER_BG_COLORS,
  HOVER_BORDER_COLORS,
  HOVER_TEXT_COLORS,
  PEER_CHECKED_BG_COLORS,
  PEER_CHECKED_BORDER_COLORS,
  PEER_CHECKED_TEXT_COLORS,
  TEXT_COLORS,
  WHERE_TO_BUY_CONTENT_ID,
} from "../../utils/constants.tsx";
import { clx } from "../../utils/clx.ts";
import {
  Colors,
  FontSize,
  FontWeight,
  GapSizes,
  WidthAndHeight,
} from "../../utils/types.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";
import { Props as ContentProps } from "../../components/social/WhereToBuyContent.tsx";
import { useComponent } from "../Component.tsx";
import { AppContext } from "../../mod.ts";
import stylingDiff from "../../utils/styling/institucional/WhereToBuy/stylingDiff.ts";
import { useDevice } from "@deco/deco/hooks";
import { CountryCardContent } from "../../loaders/whereToBuy.ts";

export function loader(props: Props, _req: Request, ctx: AppContext) {
  return {
    ...props,
    siteTemplate: ctx.siteTemplate,
  };
}

export interface Props {
  /**
   * @title Title props
   */
  titleText: string;
  /**
   * @title Description props
   */
  descriptionText?: string;
  /**
   * @title Cards
   */
  countries: CountryCardContent[] | undefined;
  /**
   * @title Spacing config
   */
  spacing?: SpacingConfig;
}

export interface CountryCardStyle {
  /**
   * @title Font color
   */
  fontColor: Colors;
  /**
   * @title Title Font size
   * @description text-xs: 12px, text-sm: 14px, text-base: 16px, text-lg: 18px, text-xl: 20px, text-2xl: 24px, text-3xl: 30px
   */
  fontSize: FontSize;
  /**
   * @title Border color
   * @description Default border color
   */
  colorBorder?: Colors;
  /**
   * @title Border width
   */
  borderWidth?: "1" | "2";
  /**
   * @title Hover Font color
   * @description Font color when hover country card
   */
  hoverFontColor?: Colors;
  /**
   * @title Hover color
   * @description Bg color when hover country card
   */
  hoverColor: Colors;
  /**
   * @title Hover Border color
   * @description Border color when select country card
   */
  hoverColorBorder: Colors;
}

export interface StoreCardStyle {
  /**
   * @title Title Font size
   * @description text-xs: 12px, text-sm: 14px, text-base: 16px, text-lg: 18px, text-xl: 20px, text-2xl: 24px, text-3xl: 30px
   */
  titleFontSize: FontSize;
  /**
   * @title Title Font color
   */
  fontColor: Colors;
  /**
   * @title Title Font Weight
   */
  fontWeight?: FontWeight;
  /**
   * @title Description Font size
   * @description text-xs: 12px, text-sm: 14px, text-base: 16px, text-lg: 18px, text-xl: 20px, text-2xl: 24px, text-3xl: 30px
   */
  descriptionFontSize: FontSize;
  /**
   * @title Description font color
   */
  descriptionFontColor?: Colors;

  /**
   * @title Images Sizes
   */
  imagesSizes: ImageSizes;
  /**
   * @title Cards grid (only desktop)
   */
  grid: "1" | "2" | "3" | "4";
  /**
   * @title Cards gap
   */
  gap: GapSizes;
  /**
   * @title Border color
   */
  colorBorder: Colors;
}

interface ImageSizes {
  mobile: WidthAndHeight;
  desktop: WidthAndHeight;
}

const Content = import.meta.resolve(
  "../../components/social/WhereToBuyContent.tsx",
);

export default function Support(
  { titleText, descriptionText, spacing, countries, siteTemplate }: ReturnType<
    typeof loader
  >,
) {
  const styling = stylingDiff[siteTemplate];
  const device = useDevice() === "desktop" ? "desktop" : "mobile";
  const { title, description, countryCardStyle } = styling[device];
  return (
    <Container
      spacing={spacing}
      class={clx(
        "px-6 lg:px-0 container",
      )}
    >
      {/** Title */}
      <h1
        class={clx(
          TEXT_COLORS[title.fontColor ?? "primary"],
          title.fontWeight ?? "font-semibold",
          title.fontSize,
        )}
      >
        {titleText}
      </h1>
      {/** Description */}
      {descriptionText && (
        <div
          class={clx(
            "mt-4 lg:mt-6",
            TEXT_COLORS[description.fontColor ?? "primary"],
            description.fontSize,
            description.fontWeight ?? "font-light",
          )}
        >
          <span>{descriptionText}</span>
        </div>
      )}
      {/** Country Cards */}
      <div class="flex flex-row flex-wrap pt-6 gap-4">
        {countries?.map(({ label, icon, countryStores }, index) => {
          const id = `country-${index}`;
          return (
            <div>
              <input
                type="radio"
                class="peer hidden"
                name="country-group"
                id={id}
              />
              <label
                class={clx(
                  "flex flex-col gap-1 font-light rounded-sm cursor-pointer peer-checked:font-medium hover:font-medium peer-checked:pointer-events-none",
                  TEXT_COLORS[countryCardStyle.fontColor],
                  countryCardStyle.fontSize,
                  HOVER_BG_COLORS[countryCardStyle.hoverColor],
                  HOVER_BORDER_COLORS[countryCardStyle.hoverColorBorder],
                  PEER_CHECKED_BG_COLORS[countryCardStyle.hoverColor],
                  PEER_CHECKED_BORDER_COLORS[countryCardStyle.hoverColorBorder],
                  BORDER_COLORS[countryCardStyle?.colorBorder ?? "neutral"],
                  BORDER_CLASSES.full[countryCardStyle.borderWidth ?? "1"],
                  HOVER_TEXT_COLORS[
                    countryCardStyle.hoverFontColor ??
                      countryCardStyle.fontColor
                  ],
                  PEER_CHECKED_TEXT_COLORS[
                    countryCardStyle.hoverFontColor ??
                      countryCardStyle.fontColor
                  ],
                  icon ? "px-4 pb-2.5 pt-3.5" : "px-6 py-3.5",
                )}
                for={id}
                hx-trigger="click"
                hx-target={`#${WHERE_TO_BUY_CONTENT_ID}`}
                hx-swap="innerHTML"
                hx-select="section>*"
                hx-post={useComponent<ContentProps>(Content, {
                  siteTemplate,
                  device,
                  stores: countryStores,
                })}
              >
                {icon && <Icon id={icon} width={20} height={15} />}
                <div class="relative">
                  <span class="invisible font-medium">{label}</span>
                  <span class="absolute left-0 top-0">
                    {label}
                  </span>
                </div>
              </label>
            </div>
          );
        })}
      </div>
      {/** Store Cards */}
      <div id={WHERE_TO_BUY_CONTENT_ID}></div>
    </Container>
  );
}

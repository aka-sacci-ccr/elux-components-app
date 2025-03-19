import { Picture, Source } from "apps/website/components/Picture.tsx";
import {
  BORDER_COLORS,
  GAP_X_SIZES,
  GRID_SIZES_DESKTOP,
  TEXT_COLORS,
} from "../../utils/constants.tsx";
import { clx } from "../../utils/clx.ts";
import stylingDiff from "../../utils/styling/institucional/WhereToBuy/stylingDiff.ts";
import { CountryStores } from "../../loaders/whereToBuy.ts";

export interface Props {
  siteTemplate: "frigidaire" | "elux";
  device: "desktop" | "mobile";
  stores?: CountryStores[];
  countryName: string;
}

export default function WhereToBuyContent(
  { stores, siteTemplate, device, countryName }: Props,
) {
  if (!stores || stores.length === 0) {
    return <div class="h-[300px]"></div>;
  }
  const styling = stylingDiff[siteTemplate];

  const {
    grid,
    gap,
    fontColor,
    titleFontSize,
    descriptionFontSize,
    imagesSizes,
    colorBorder,
    fontWeight,
    descriptionFontColor,
  } = styling[device].storeCardStyle;

  return (
    <div
      class={clx(
        "mt-10 sm:mt-12 grid grid-cols-1 gap-y-8",
        GRID_SIZES_DESKTOP[grid],
        GAP_X_SIZES[gap],
      )}
    >
      {stores.map((store) => (
        <div class="flex flex-col gap-2 sm:gap-4">
          {/* Image */}
          <Picture
            class={clx(
              "h-min rounded",
              BORDER_COLORS[colorBorder],
              store.disableBorder ? "border-none border-0" : "border",
            )}
          >
            <Source
              media="(max-width: 640px)"
              src={store.mobileImage}
              width={imagesSizes.mobile.width ?? 327}
              height={imagesSizes.mobile.height ?? 148}
            />
            <Source
              media="(min-width: 640px)"
              src={store.desktopImage}
              width={imagesSizes.desktop.width ?? 333}
              height={imagesSizes.desktop.height ?? 174}
            />
            <img
              src={store.desktopImage}
              alt={store.title}
              class="w-full object-cover"
            />
          </Picture>
          {/* Text */}
          <div class="flex flex-col" data-gtm-block-name="retailers">
            <label
              class={clx(
                titleFontSize,
                TEXT_COLORS[fontColor],
                fontWeight,
              )}
            >
              {store.title}
            </label>
            <a
              href={store.href}
              data-gtm-element="retailers-link"
              data-gtm-country={countryName}
              data-gtm-retailer={store.title}
              target="_blank"
              rel="noopener noreferrer"
              class={clx(
                descriptionFontSize,
                "font-light underline",
                TEXT_COLORS[descriptionFontColor ?? fontColor],
              )}
            >
              {store.description}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

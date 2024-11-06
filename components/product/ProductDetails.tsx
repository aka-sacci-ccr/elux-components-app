import { PropertyValue } from "apps/commerce/types.ts";
import AdditionalPropertyCards from "./AdditionalPropertyCards.tsx";
import Icon from "../ui/Icon.tsx";
import {
  BG_COLORS,
  BORDER_COLORS,
  DEFAULT_TECH_SHEET_CONFIG,
  iconMap,
  LANGUAGE_DIFFS,
  TEXT_COLORS,
} from "../../utils/constants.tsx";
import { clx } from "../../utils/clx.ts";
import { ProductMainProps } from "../../sections/Product/ProductDetails/ProductPage.tsx";

interface Props {
  additionalProperty: PropertyValue[] | undefined;
  description: string | undefined;
  language: "EN" | "ES";
  productMain: ProductMainProps;
}

export default function ProductDetails(
  { additionalProperty, description, language, productMain }: Props,
) {
  const { tabs } = productMain;
  const dimensionsProperties = additionalProperty?.filter((property) =>
    property.propertyID === "HEIGHT" || property.propertyID === "WIDTH" ||
    property.propertyID === "DEPTH" || property.propertyID === "WEIGHT"
  );
  const dimensionsPropertiesWithBox = additionalProperty?.filter((property) =>
    property.propertyID === "BOX_HEIGHT" ||
    property.propertyID === "BOX_WIDTH" ||
    property.propertyID === "BOX_DEPTH" || property.propertyID === "BOX_WEIGHT"
  );

  const propertyCards = additionalProperty?.filter((property) =>
    property.propertyID === "DESCRIPTION"
  );

  const tableProperties = additionalProperty?.filter((property) =>
    property.propertyID === "OTHER"
  );

  const techSheetConfig =
    !tabs?.techSheet?.length || tabs?.techSheet?.length < 2
      ? DEFAULT_TECH_SHEET_CONFIG
      : tabs?.techSheet;

  const techSheetConfigSize = techSheetConfig.length;

  const getIconId = (propertyID: string) => {
    if (iconMap[propertyID]) return iconMap[propertyID];

    const cleanedPropertyID = propertyID.replace(/^BOX_/, "");

    return iconMap[cleanedPropertyID] || "depth-property";
  };

  const DimensionsCards: React.FC<Pick<Props, "additionalProperty">> = (
    { additionalProperty: dimensions },
  ) => {
    return (
      <ul
        className={`${
          dimensions && dimensions.length <= 3
            ? "flex items-center"
            : "grid grid-cols-2 grid-rows-2"
        } w-full my-4 text-secondary lg:flex lg:items-center`}
      >
        {dimensions?.map((dimension) => {
          const iconId = getIconId(dimension.propertyID ?? "");
          return (
            <li
              className="flex flex-col gap-1 items-center flex-1 h-28"
              key={dimension["@id"]}
            >
              <Icon id={iconId} className="text-primary" size={24} />
              <span className="mt-1">{dimension.value}</span>
              <span className="font-light text-sm">{dimension.name}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      class={clx("w-full lg:pb-6", BG_COLORS[productMain.bgColor ?? "white"])}
    >
      <div className="w-full max-w-[65rem] mx-auto px-5 lg:px-0">
        <div class="hidden lg:flex w-full pb-6">
          <a
            href="#description"
            class={clx(
              "flex flex-1 border-b-2 items-center justify-center py-3",
              TEXT_COLORS[tabs?.enabledTab?.fontColor ?? "primary"],
              tabs?.enabledTab?.fontSize,
              tabs?.enabledTab?.fontWeight,
              BORDER_COLORS[tabs?.enabledTab?.underlineColor ?? "primary"],
            )}
          >
            {LANGUAGE_DIFFS[language].productPage.descriptionTitle}
          </a>
          <a
            href="#properties"
            class={clx(
              "flex flex-1 border-b-2 items-center justify-center py-3",
              TEXT_COLORS[tabs?.disabledTab?.fontColor ?? "base-content"],
              tabs?.disabledTab?.fontSize,
              tabs?.disabledTab?.fontWeight ?? "font-light",
              BORDER_COLORS[tabs?.disabledTab?.underlineColor ?? "neutral"],
            )}
          >
            {LANGUAGE_DIFFS[language].productPage.recordTitle}
          </a>
        </div>
        <div class="flex flex-col lg:gap-12">
          <div
            class={clx(
              "bg-white lg:pt-6 max-lg:my-6 max-lg:pt-6",
              productMain?.bgColor === "white" || !productMain?.bgColor
                ? ""
                : "lg:px-6 max-lg:px-4",
            )}
          >
            <h2
              className={clx(
                "text-left",
                TEXT_COLORS[tabs?.titles?.fontColor ?? "secondary"],
                tabs?.titles?.fontSize ?? "text-base",
                tabs?.titles?.fontWeight,
              )}
            >
              {LANGUAGE_DIFFS[language].productPage.descriptionTitle}
            </h2>
            <article
              class={clx(
                "py-4 font-light text-secondary",
                "lg:border-b border-base-200 max-sm:hidden",
                tabs?.productDescription?.descriptionSize ?? "text-sm",
              )}
            >
              {description}
            </article>
            <div>
              <AdditionalPropertyCards
                propertyCards={propertyCards}
                mergeQuantity={productMain.mergeQuantity}
                productDescription={tabs?.productDescription}
              />
            </div>
          </div>
          <div
            class={clx(
              "max-lg:w-screen max-lg:-ml-5 max-lg:bg-white max-lg:px-6 max-lg:pt-4 bg-white lg:py-6",
              productMain?.bgColor === "white" || !productMain?.bgColor
                ? ""
                : "lg:px-6",
            )}
          >
            <h2
              className={clx(
                "pb-6",
                TEXT_COLORS[tabs?.titles?.fontColor ?? "secondary"],
                tabs?.titles?.fontSize ?? "text-base",
                tabs?.titles?.fontWeight,
              )}
              id="properties"
            >
              {LANGUAGE_DIFFS[language].productPage.recordTitle}
            </h2>
            <span class="text-sm text-secondary flex lg:hidden py-2">
              {LANGUAGE_DIFFS[language].productPage.dimensionsProduct}
            </span>
            <div className="flex flex-col px-2 min-h-60">
              <div role="tablist" class="tabs border-primary tabs-bordered">
                <input
                  type="text"
                  disabled
                  value={LANGUAGE_DIFFS[language].productPage.dimensionsProduct}
                  class="tab !text-secondary !bg-transparent !border-0 text-sm px-0 lg:w-48 hidden lg:flex"
                />
                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  class="tab text-xs text-primary font-light checked:!border-primary"
                  aria-label={LANGUAGE_DIFFS[language].productPage
                    .dimensionsBox}
                />
                <div
                  role="tabpanel"
                  class="tab-content bg-base-100 rounded-box py-5"
                >
                  <DimensionsCards
                    additionalProperty={dimensionsPropertiesWithBox}
                  />
                </div>

                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  class="tab text-xs text-primary font-light checked:!border-primary"
                  aria-label={LANGUAGE_DIFFS[language].productPage.dimensions}
                  checked={true}
                />
                <div
                  role="tabpanel"
                  class="tab-content bg-base-100  rounded-box py-5"
                >
                  <DimensionsCards additionalProperty={dimensionsProperties} />
                </div>
              </div>
            </div>
            {tableProperties && (
              <div className="w-full">
                <ul>
                  {tableProperties.map((item, index) => {
                    const { bgColor, descriptionProps, valueProps } =
                      techSheetConfig[index % techSheetConfigSize];
                    return (
                      <li
                        className={clx(
                          "flex justify-between items-center p-2 text-sm",
                          BG_COLORS[bgColor],
                        )}
                      >
                        <span
                          className={clx(
                            descriptionProps.fontWeight,
                            TEXT_COLORS[descriptionProps.fontColor],
                          )}
                        >
                          {item.name}
                        </span>
                        <span
                          className={clx(
                            valueProps.fontWeight,
                            TEXT_COLORS[valueProps.fontColor],
                          )}
                        >
                          {item.value}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

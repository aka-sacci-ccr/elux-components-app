import { PropertyValue } from "apps/commerce/types.ts";
import AdditionalPropertyCards from "./AdditionalPropertyCards.tsx";
import Icon, { AvailableIcons } from "../ui/Icon.tsx";
import { BG_COLORS, LANGUAGE_DIFFS } from "../../utils/constants.tsx";
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
  const iconMap: Record<string, AvailableIcons> = {
    WIDTH: "width-property",
    HEIGHT: "height-property",
    WEIGHT: "weight-property",
    DEPTH: "depth-property",
    BOX_WIDTH: "width-property",
    BOX_HEIGHT: "height-property",
    BOX_WEIGHT: "weight-property",
    BOX_DEPTH: "depth-property",
  };

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
            class="flex flex-1 border-b-2 border-primary text-primary  items-center justify-center py-3"
          >
            {LANGUAGE_DIFFS[language].productPage.descriptionTitle}
          </a>
          <a
            href="#properties"
            class="flex flex-1 border-b-2 border-neutral text-base-content font-light items-center justify-center py-3"
          >
            {LANGUAGE_DIFFS[language].productPage.recordTitle}
          </a>
        </div>
        <div>
          <div
            class={clx(
              "bg-white lg:py-6 max-lg:my-6 max-lg:pt-6",
              productMain?.bgColor === "white" || !productMain?.bgColor
                ? ""
                : "lg:px-6 max-lg:px-4",
            )}
          >
            <h2 className="text-secondary text-base text-left">
              {LANGUAGE_DIFFS[language].productPage.descriptionTitle}
            </h2>
            <article className="py-4 text-sm font-light text-secondary leading-6 lg:border-b border-base-200 max-sm:hidden">
              {description}
            </article>
            <div>
              <AdditionalPropertyCards
                propertyCards={propertyCards}
                mergeQuantity={productMain.mergeQuantity}
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
              className="text-secondary text-base pb-6"
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
                  class="tab-content bg-base-100  rounded-box p-6"
                >
                  <DimensionsCards additionalProperty={dimensionsProperties} />
                </div>
              </div>
            </div>
            {tableProperties && (
              <div className="w-full">
                <ul>
                  {tableProperties.map((item) => {
                    return (
                      <li className="even:bg-base-300 flex justify-between items-center p-2 text-sm">
                        <span className="text-secondary">
                          {item.name}
                        </span>
                        <span className="text-base-content font-light">
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

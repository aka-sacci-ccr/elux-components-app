import { PropertyValue } from "apps/commerce/types.ts";
import AdditionalPropertyCards from "./AdditionalPropertyCards.tsx";
import Icon, { AvailableIcons } from "../ui/Icon.tsx";

interface Props {
  additionalProperty: PropertyValue[] | undefined;
  description: string | undefined;
  language: "EN" | "ES";
}

export default function ProductDetails(
  { additionalProperty, description }: Props,
) {
  const dimensionsProperties = additionalProperty?.filter((property) =>
    property.propertyID === "HEIGHT" || property.propertyID === "WIDTH" ||
    property.propertyID === "DEPTH" || property.propertyID === "WEIGHT"
  );
  const dimensionsPropertiesWithBox = additionalProperty?.filter((property) =>
    property.propertyID === "BOX_HEIGHT" || property.propertyID === "BOX_WIDTH" ||
    property.propertyID === "BOX_DEPTH" || property.propertyID === "BOX_WEIGHT"
  );

  console.log("with box ", dimensionsPropertiesWithBox)
  const PropertyCards = additionalProperty?.filter((property) =>
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
    BOX_DEPTH: "depth-property"
  };

  const getIconId = (propertyID: string) => {
    if (iconMap[propertyID]) return iconMap[propertyID];

    const cleanedPropertyID = propertyID.replace(/^BOX_/, "");

    return iconMap[cleanedPropertyID] || "depth-property";
  };

  const DimensionsCards: React.FC<Pick<Props, 'additionalProperty'>> = ({ additionalProperty: dimensions }) => {
    return (
      <ul
        className={`${dimensions && dimensions.length <= 3
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
    <div className="w-full max-w-[65rem] mx-auto px-5 lg:px-0">
      <div class="hidden lg:flex w-full mt-4 mb-10">
        <a
          href="#description"
          class="flex flex-1 border-b-2 border-primary text-primary  items-center justify-center py-3"
        >
          Descripción
        </a>
        <a
          href="#properties"
          class="flex flex-1 border-b-2 border-neutral text-base-content font-light items-center justify-center py-3"
        >
          Ficha Técnica
        </a>
      </div>
      <h2 className="text-secondary text-base text-center py-6">
        Descripción del Producto
      </h2>
      <article className="py-4 text-sm font-light text-secondary leading-6 lg:border-b border-base-200">
        {description}
      </article>
      <div>
        <AdditionalPropertyCards
          PropertyCards={PropertyCards}
        />
      </div>
      <h2 className="text-secondary text-base text-center py-6" id="properties">
        Ficha Técnica
      </h2> 
      <span class="text-sm text-secondary flex lg:hidden py-2">Dimensiones del producto:</span>
      <div className="flex flex-col px-2 min-h-60">
        <div role="tablist" class="tabs border-primary tabs-bordered">
        <input type="text" disabled value="Dimensiones del producto:" class="tab !text-secondary !bg-transparent !border-0 text-sm px-0 lg:w-48 hidden lg:flex" />
          <input type="radio" name="my_tabs_2" role="tab" class="tab text-xs text-primary font-light checked:!border-primary" aria-label="con caja" />
          <div role="tabpanel" class="tab-content bg-base-100 rounded-box py-5">
            <DimensionsCards additionalProperty={dimensionsPropertiesWithBox}/>
          </div>

          <input
            type="radio" name="my_tabs_2" role="tab" class="tab text-xs text-primary font-light checked:!border-primary" aria-label="sin caja" checked={true} />
          <div role="tabpanel" class="tab-content bg-base-100  rounded-box p-6">
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
  );
}

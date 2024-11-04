import { PropertyValue } from "apps/commerce/types.ts";
import AdditionalPropertyCards from "./AdditionalPropertyCards.tsx";
import Icon from "../ui/Icon.tsx";

interface Props {
  additionalProperty: PropertyValue[] | undefined;
  description: string | undefined;
}

export default function ProductDetails(
  { additionalProperty, description }: Props,
) {
  const dimensionsProperties = additionalProperty?.filter((property) =>
    property.propertyID === "HEIGHT" || property.propertyID === "WIDTH" ||
    property.propertyID === "DEPTH" || property.propertyID === "WEIGHT"
  );
  const PropertyCards = additionalProperty?.filter((property) =>
    property.propertyID === "DESCRIPTION"
  );

  const _tableProperties = additionalProperty?.filter((property) =>
    property.propertyID === "OTHER"
  );

  const test = [
    { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
    { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
    { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
    { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
    { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
    { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
    { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
    { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
  ];

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
      <article className="py-3 text-sm font-light text-secondary leading-6">
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

      <div className="flex flex-col px-2">
        <div className="flex flex-col md:flex-row gap-2">
          <span className="text-secondary text-sm">
            Dimensiones del producto:
          </span>
          <div className="flex gap-2">
            <a href="#" className="text-xs text-base-content font-light underline">
              con caja
            </a>
            <span className="text-base-200 mb-2">|</span>
            <a href="#" className="text-xs text-primary font-light underline">
              sin caja
            </a>
          </div>
        </div>
        <ul className={`${dimensionsProperties && dimensionsProperties.length < 3 ? 'flex items-center' : 'grid grid-cols-2 grid-rows-2'} w-full my-4 text-secondary lg:flex lg:items-center`}>
  {
    dimensionsProperties?.map((dimension) => { 
      const propertyIcon = () => {
        switch (dimension.propertyID) {
          case "WIDTH":
            return "width-property";
          case "HEIGHT":
            return "height-property";
            case "WEIGHT":
              return "weight-property";
          default:
            return "depth-property";
        }
      };

      return (
        <li className="flex flex-col gap-1 items-center flex-1 h-28" key={dimension["@id"]}>
          <Icon id={propertyIcon()} className="text-primary" size={24} />
          <span className="mt-1">{dimension.value}</span>
          <span className="font-light text-sm">{dimension.name}</span>
        </li>
      );
    })
  }
</ul>
      </div>
      {test && (
        <div className="w-full">
          <ul>
            {test.map((item) => {
              return (
                <li className="even:bg-base-300 flex justify-between items-center p-2 text-sm">
                  <span className="text-secondary">
                    {item.firstText}
                  </span>
                  <span className="text-base-content font-light">
                    {item.secondText}
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

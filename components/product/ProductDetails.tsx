import { PropertyValue } from "apps/commerce/types.ts";
import AdditionalPropertyCards from "./AdditionalPropertyCards.tsx";

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
        <ul className={`${dimensionsProperties && dimensionsProperties?.length < 3 ? 'flex items-center' : 'grid grid-cols-2 grid-rows-2' } w-full my-4 text-secondary lg:flex lg:items-center`}>
          {
            dimensionsProperties?.map((dimension) => (
              <li className="flex flex-col gap-1 items-center flex-1 h-28" key={dimension["@id"]}>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.3334 23.4783V0.521738C24.3334 0.233589 24.0998 0 23.8116 0H0.855112C0.566963 0 0.333374 0.233589 0.333374 0.521738V23.4783C0.333374 23.7664 0.566963 24 0.855112 24H23.8116C24.0998 24 24.3334 23.7664 24.3334 23.4783ZM23.2899 22.9565H1.37685V1.04348H23.2899V22.9565ZM12.311 18.6789L10.0712 16.4391C9.86746 16.2354 9.53713 16.2354 9.33337 16.4391C9.12962 16.6429 9.12962 16.9732 9.33337 17.177L12.4638 20.3074C12.6676 20.5112 12.9979 20.5112 13.2016 20.3074L16.3321 17.177C16.5358 16.9732 16.5358 16.6429 16.3321 16.4391C16.1283 16.2354 15.798 16.2354 15.5942 16.4391L13.3545 18.6789L13.3545 5.12852L15.5942 7.36829C15.798 7.57204 16.1283 7.57204 16.3321 7.36829C16.5358 7.16453 16.5358 6.83418 16.3321 6.63043L13.2016 3.5C12.9979 3.29625 12.6676 3.29625 12.4638 3.5L9.33337 6.63043C9.12962 6.83418 9.12962 7.16453 9.33337 7.36829C9.53713 7.57204 9.86746 7.57204 10.0712 7.36829L12.311 5.12852L12.311 18.6789Z"
                    fill="#EE405A"
                  />
                </svg>
                <span className="mt-1">{dimension.value}</span>
                <span className="font-light text-sm">{dimension.name}</span>
              </li>

            ))
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

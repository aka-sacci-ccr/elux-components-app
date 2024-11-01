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
  const widthDimension = dimensionsProperties?.find((dimension) =>
    dimension.propertyID === "WIDTH"
  )?.value;
  const heightDimension = dimensionsProperties?.find((dimension) =>
    dimension.propertyID === "HEIGHT"
  )?.value;
  const depthDimension = dimensionsProperties?.find((dimension) =>
    dimension.propertyID === "DEPTH"
  )?.value;

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
          class="flex flex-1 border-b-2 border-[#EE405A] text-[#EE405A]  items-center justify-center py-3"
        >
          Descripción
        </a>
        <a
          href="#properties"
          class="flex flex-1 border-b-2 border-[#D6D6D6] text-[#848585] font-light items-center justify-center py-3"
        >
          Ficha Técnica
        </a>
      </div>
      <h2 className="text-[#323333] text-base text-center py-6">
        Descripción del Producto
      </h2>
      <article className="py-3 text-sm font-light text-[#323333] leading-6">
        {description}
      </article>
      <div>
        <AdditionalPropertyCards
          PropertyCards={PropertyCards}
        />
      </div>
      <h2 className="text-[#323333] text-base text-center py-6" id="properties">
        Ficha Técnica
      </h2>

      <div className="flex flex-col px-2">
        <div className="flex gap-2">
          <span className="text-[#323333] text-sm">
            Dimensiones del producto:
          </span>
          <a href="#" className="text-xs text-[#848585] font-light underline">
            con caja
          </a>
          <span>|</span>
          <a href="#" className="text-xs text-[#EE405A] font-light underline">
            sin caja
          </a>
        </div>
        <ul className="flex items-center w-full my-4 text-[#323333]">
          <li className="flex flex-col gap-1 items-center flex-1">
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
            <span className="mt-1">{heightDimension}</span>
            <span className="font-light text-sm">Altura</span>
          </li>
          <li className="flex flex-col gap-1 items-center flex-1 border-x border-[#EBEBEB]">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.02174 24H23.9783C24.2664 24 24.5 23.7664 24.5 23.4783V0.521738C24.5 0.233589 24.2664 0 23.9783 0H1.02174C0.733591 0 0.5 0.233589 0.5 0.521738V23.4783C0.5 23.7664 0.733591 24 1.02174 24ZM1.54348 22.9565V1.04348H23.4565V22.9565H1.54348ZM5.72481 11.9776L7.96458 9.73784C8.16833 9.53408 8.16833 9.20375 7.96458 9C7.76083 8.79625 7.43048 8.79625 7.22673 9L4.09629 12.1304C3.89254 12.3342 3.89254 12.6645 4.09629 12.8683L7.22673 15.9987C7.43048 16.2025 7.76083 16.2025 7.96458 15.9987C8.16833 15.795 8.16833 15.4646 7.96458 15.2609L5.72481 13.0211H19.2752L17.0354 15.2609C16.8317 15.4646 16.8317 15.795 17.0354 15.9987C17.2392 16.2025 17.5695 16.2025 17.7733 15.9987L20.9037 12.8683C21.1075 12.6645 21.1075 12.3342 20.9037 12.1304L17.7733 9C17.5695 8.79625 17.2392 8.79625 17.0354 9C16.8317 9.20375 16.8317 9.53408 17.0354 9.73784L19.2752 11.9776H5.72481Z"
                fill="#EE405A"
              />
            </svg>
            <span className="mt-1">{widthDimension}</span>
            <span className="font-light text-sm">Ancho</span>
          </li>
          <li className="flex flex-col  gap-1 items-center flex-1">
            <svg
              width="24"
              height="26"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2665 7.03877C23.2654 7.00437 23.2579 6.97104 23.2438 6.94011C23.2411 6.93424 23.2377 6.92917 23.2345 6.92357C23.2198 6.89638 23.2006 6.87211 23.1763 6.85131C23.1734 6.84864 23.1718 6.84464 23.1691 6.84224C23.1678 6.84118 23.1662 6.84118 23.1649 6.84038C23.163 6.83878 23.1614 6.83691 23.1593 6.83531L15.1014 1.04868C15.0404 1.00441 14.9617 0.990011 14.8886 1.00681L0.932199 4.34786C0.923132 4.34999 0.915132 4.35506 0.906332 4.35799C0.895399 4.36172 0.884199 4.36412 0.873799 4.36946C0.871933 4.37052 0.870599 4.37212 0.868466 4.37319C0.858066 4.37879 0.849 4.38652 0.839666 4.39346C0.829533 4.40092 0.819133 4.40786 0.810333 4.41639C0.802333 4.42439 0.795933 4.43346 0.789 4.44252C0.781 4.45266 0.773 4.46226 0.7666 4.47346C0.761 4.48306 0.757533 4.49346 0.753267 4.50386C0.7482 4.51612 0.7434 4.52812 0.7402 4.54092C0.7394 4.54439 0.737267 4.54759 0.736734 4.55106C0.735134 4.55906 0.736467 4.56706 0.735667 4.57506C0.734867 4.58386 0.731934 4.59239 0.731934 4.60119V18.952C0.731934 19.0355 0.772467 19.115 0.840733 19.164L8.89882 24.9504C8.91242 24.9603 8.92762 24.9659 8.94255 24.9723C8.95162 24.9768 8.95962 24.9827 8.96895 24.9853C8.99535 24.9952 9.02308 25 9.05082 25C9.07108 25 9.09162 24.9976 9.11135 24.9928L23.0681 21.6523C23.1854 21.6243 23.2683 21.519 23.2683 21.3987V7.04731C23.2683 7.04437 23.2665 7.04171 23.2665 7.03877ZM1.26126 18.687L1.25353 18.6888V5.11025L8.78975 10.5222V24.2309L1.301 18.8526L1.26126 18.687ZM9.10602 10.1068L1.60846 4.72252L14.754 1.57587V1.58387H14.9521L22.3921 6.92651L9.10602 10.1068ZM9.31161 10.594L22.7465 7.37771V21.1923L9.31161 24.408V10.594Z"
                fill="#EE405A"
                stroke="#EE405A"
                stroke-width="0.4"
              />
            </svg>

            <span className="mt-1">{depthDimension}</span>
            <span className="font-light text-sm">Profundidad</span>
          </li>
        </ul>
      </div>
      {test && (
        <div className="w-full">
          <ul>
            {test.map((item) => {
              return (
                <li className="even:bg-[#F5F5F5] flex justify-between items-center p-2 text-sm">
                  <span className="text-[#323333]">
                    {item.firstText}
                  </span>
                  <span className="text-[#848585] font-light">
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

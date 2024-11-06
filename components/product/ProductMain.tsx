import { ProductDetailsPage } from "apps/commerce/types.ts";
import GallerySlider from "./productGallery/Gallery.tsx";
import { ProductMainProps } from "../../sections/Product/ProductDetails/ProductPage.tsx";
import { clx } from "../../utils/clx.ts";
import { LANGUAGE_DIFFS, ROUNDED_OPTIONS } from "../../utils/constants.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  productMain: ProductMainProps;
  language: "EN" | "ES";
}

export default function ProductMain({ page, productMain, language }: Props) {
  if (!page) return <></>;
  const { product } = page;
  const { sku, name } = product;
  const { buyButton } = productMain;
  return (
    <div className="container flex flex-col lg:flex-row gap-4 mt-6 mb-4 px-5 lg:p-0 lg:mb-8">
      {/* Galeria do produto */}
      <div className="w-full lg:w-2/4">
        <GallerySlider
          page={page}
        />
      </div>
      <div className="flex flex-col gap-2  w-full lg:w-2/4 mt-6 lg:mt-12 lg:ml-6">
        <span className="text-sm text-info uppercase font-light">
          {sku}
        </span>
        <h2 className="text-xl text-secondary">
          {name}
        </h2>
        {!buyButton.isDisabled && (
          <a
            className={clx(
              "flex justify-center items-center",
              "w-full lg:max-w-80 h-[42px] bg-primary",
              "text-white text-sm font-semibold mt-4",
              ROUNDED_OPTIONS[buyButton.rounded],
            )}
            href={buyButton.redirectTo}
          >
            {LANGUAGE_DIFFS[language].productPage.buttonText}
          </a>
        )}
      </div>
    </div>
  );
}

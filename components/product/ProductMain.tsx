import { ProductDetailsPage } from "apps/commerce/types.ts";
import GallerySlider from "./productGallery/Gallery.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductMain({ page }: Props) {
  if (!page) return <></>;
  const { product } = page;
  const { sku, name, url } = product;
  return (
    <div className="container flex flex-col lg:flex-row gap-4 my-6 px-5 lg:p-0 lg:mb-28">
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
        <a
          className="flex justify-center items-center w-full lg:max-w-80 h-[42px] rounded-3xl bg-primary text-white text-sm font-semibold mt-4"
          href={url}
        >
          Where to buy
        </a>
      </div>
    </div>
  );
}

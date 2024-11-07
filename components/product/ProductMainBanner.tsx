import Image from "apps/website/components/Image.tsx";
import { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

export default function ProductMainBanner({ product }: Props) {
  if (!product) return <></>;
  const { name, image, sku, brand } = product;

  const mainBannerMobile = image?.find((image) =>
    image.additionalType === "MAIN_BANNER_MOBILE"
  );
  const mainBannerDesktop = image?.find((image) =>
    image.additionalType === "MAIN_BANNER"
  );

  return (
    <div className="w-full relative overflow-hidden mx-auto">
      <div className="flex lg:hidden">
        <Image
          alt={mainBannerMobile?.description}
          src={mainBannerMobile?.url ?? ""}
          width={400}
          height={600}
          class=" object-contain w-full"
        />
      </div>
      <div className="hidden lg:flex">
        <Image
          alt={mainBannerDesktop?.description}
          src={mainBannerDesktop?.url ?? ""}
          width={1280}
          height={600}
          class=" object-contain w-full"
        />
      </div>
      <div class="absolute z-10 w-full h-full top-0 bg-black opacity-40"></div>
      <div class="absolute z-20 flex flex-col bottom-5 lg:bottom-32 lg:left-40 text-white px-5 lg:p-0 gap-2 max-w-96">
        <span className="text-base lg:text-xl uppercase font-medium">
          {sku}
        </span>
        <h1 className="text-2.5xl lg:text-4xl font-semibold">
          {brand?.name}
        </h1>
        <h2 className="text-base font-light">
          {name}
        </h2>
      </div>
    </div>
  );
}

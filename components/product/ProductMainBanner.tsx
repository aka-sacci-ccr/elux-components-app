import Image from "apps/website/components/Image.tsx";
import { ImageObject } from "apps/commerce/types.ts";

interface Props {
  images: ImageObject[] | undefined;
}

export default function ProductMainBanner({ images }: Props) {
  if (!images) return <></>;

  return (
    <div className="w-full relative overflow-hidden mx-auto">
      <div className="flex lg:hidden">
        <Image
          alt={images[1].name}
          src={images[1].url || ""}
          width={400}
          height={600}
          class=" object-contain w-full"
        />
      </div>
      <div className="hidden lg:flex">
        <Image
          alt={images[0].name}
          src={images[0].url || ""}
          width={1280}
          height={600}
          class=" object-contain w-full"
        />
      </div>
      <div class="absolute z-10 w-full h-full top-0 bg-black opacity-40"></div>
      <div class="absolute z-20 flex flex-col bottom-5 lg:bottom-32 lg:left-40 text-white px-5 lg:p-0 gap-2 max-w-96">
        <span className="text-base lg:text-xl uppercase">
          FRFWV5HTS
        </span>
        <h1 className="text-[1.75rem] lg:text-4xl leading-9">
          Frigidaire
        </h1>
        <h2 className="text-base leading-6 font-light">
          French Door 4 puertas 11 Cu. Ft. Refrigerador Gris
        </h2>
      </div>
    </div>
  );
}

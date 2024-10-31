import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  image?: {
    /** @description Image for big screens */
    src: ImageWidget;
    /** @description image alt text */
    alt: string;
  };
}

export default function AdditionalPropertyCards({ image }: Props) {
  return (
    <div className="w-full max-w-[65rem] mx-auto lg:grid lg:grid-cols-[520px_520px] my-6">
      <div className="w-full max-w-[520px] lg:max-h-[231px] overflow-hidden flex flex-col lg:flex-row-reverse lg:border-t border-[#EBEBEB]">
        {image && (
          <div class="w-full lg:max-w-[240px] h-[300px] flex justify-center overflow-hidden">
            <Image
              alt={image?.alt}
              src={image.src}
              width={375}
              height={300}
              class=" object-contain w-full"
            />
          </div>
        )}
        <div class="flex flex-col flex-1 gap-2 text-[#323333] text-sm pt-6">
          <span>Cajón SuperFresh</span>
          <article className="font-light">
            Más flexibilidad para adaptar la temperatura del cajón según tus
            necesidades y tipos de alimentos. Al seleccionar la función ‘Carne’,
            puedes almacenar carne, pollo o pescado y mantenerlos frescos por
            más tiempo. La función ‘Hortifruti’ conserva verduras, legumbres y
            frutas.
          </article>
        </div>
      </div>
      <div className="w-full max-w-[520px] lg:max-h-[231px] overflow-hidden flex flex-col lg:flex-row-reverse lg:border-t border-[#EBEBEB]">
        {image && (
          <div class="w-full lg:max-w-[240px] h-[300px] flex justify-center overflow-hidden">
            <Image
              alt={image?.alt}
              src={image.src}
              width={375}
              height={300}
              class=" object-contain w-full"
            />
          </div>
        )}
        <div class="flex flex-col flex-1 gap-2 text-[#323333] text-sm pt-6">
          <span>Cajón SuperFresh</span>
          <article className="font-light">
            Más flexibilidad para adaptar la temperatura del cajón según tus
            necesidades y tipos de alimentos. Al seleccionar la función ‘Carne’,
            puedes almacenar carne, pollo o pescado y mantenerlos frescos por
            más tiempo. La función ‘Hortifruti’ conserva verduras, legumbres y
            frutas.
          </article>
        </div>
      </div>
    </div>
  );
}

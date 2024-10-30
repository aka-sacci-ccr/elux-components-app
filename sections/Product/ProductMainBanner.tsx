import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
    image: {
        /** @description Image for big screens */
        desktopSrc: ImageWidget;
        /** @description Image for small screens */
        mobileSrc: ImageWidget;
        /** @description image alt text */
        alt: string;
    };
}

export default function ProductMainBanner({ image }: Props) {

    return (
        <div className="w-full relative h-[600px] overflow-hidden">
            <Image
                alt={image.alt}
                src={image.desktopSrc}
                width={1280}
                height={600}
                class=" object-contain w-full"
            />
            <div class="absolute z-10 w-full h-full top-0 bg-warning opacity-40"></div>
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
    )
}
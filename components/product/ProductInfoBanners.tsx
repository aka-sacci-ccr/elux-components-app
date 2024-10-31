
import { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
    backgroundColor: {
        /** @description Primary background component */
        primary: string;
        /** @description Secondary background component */
        secondary: string;
    }
    titleColor: {
        /** @description Primary title color */
        primary: string;
        /** @description Secondary title color */
        secondary: string;
    }
    contentColor: {
        /** @description Primary text color */
        primary: string;
        /** @description Secondary text color */
        secondary: string;
    }
    images: ImageObject[] | undefined
}

export default function ProductInfoBanners({ images, backgroundColor, titleColor, contentColor }: Props) {

    return (
        <div className="w-full max-w-7xl lg:mx-auto">
            {images && images?.map((image, index) => (
                <div className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                    style={{
                        backgroundColor: index % 2 === 0 ? backgroundColor.primary : backgroundColor.secondary
                    }}>
                    <div className="max-w-[640px]">
                        <Image
                            alt={image.description}
                            src={image.url || ''}
                            width={640}
                            height={516}
                            class=" object-contain"
                        />
                    </div>
                    <div class="w-full flex items-center bg-red-400 min-h-56 max-h-[516px] lg:w-[640px]">
                        <div className="w-full max-w-[400px] h-full flex flex-col mx-auto text-left justify-center gap-4 p-3">
                            <span className="text-xl"
                                style={{
                                    color: index % 2 === 0 ? titleColor.primary : titleColor.secondary
                                }}>
                                {image.name}
                            </span>
                            <p className="text-base font-light"
                                style={{
                                    color: index % 2 === 0 ? contentColor.primary : contentColor.secondary
                                }}>
                                {image.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
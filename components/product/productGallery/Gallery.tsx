import {
  ImageObject,
  ProductDetailsPage,
  VideoObject,
} from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductImageZoom from "./ProductImageZoom.tsx";
import { clx } from "../../../utils/clx.ts";
import Icon from "../../ui/Icon.tsx";
import Slider from "../../ui/Slider.tsx";
import { useId } from "../../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const WIDTH = 536;
const HEIGHT = 550;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();
  const zoomId = `${id}-zoom`;
  const device = useDevice();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const { page: { product: { name, isVariantOf, image: pImages } } } = props;
  const { page: { product } } = props;
  // Filter images when image's alt text matches product name
  // More info at: https://community.shopify.com/c/shopify-discussions/i-can-not-add-multiple-pictures-for-my-variants/m-p/2416533
  const groupImages = isVariantOf?.image ?? pImages ?? [];
  const filtered = groupImages.filter((img) =>
    name?.includes(img.alternateName || "")
  );

  const images = filtered.length > 0 ? filtered : groupImages;

  function imagesAndVideosData(
    images: ImageObject[],
    product: { video: VideoObject[] },
  ) {
    // TROCAR PARA A TIPAGEM CORRETA
    const filteredImages = images.filter((image) =>
      image.additionalType === "INFO_BANNER"
    );

    const videos = product.video.length > 0 ? product.video : [];

    return [...filteredImages, ...videos];
  }
  const productMidia = imagesAndVideosData(images, {
    video: product.video ?? [],
  });

  return (
    <>
      <div
        id={id}
        class="flex flex-col sm:gap-14"
      >
        {/* Image Slider */}
        <div class={clx("grid col-start-1 col-span-1 sm:col-start-2")}>
          <div class="relative h-min flex-grow">
            <Slider class="carousel carousel-center gap-6 w-full">
              {productMidia.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full"
                >
                  {img["@type"] === "ImageObject"
                    ? (
                      <label
                        class="flex w-full h-full cursor-zoom-in"
                        for={zoomId}
                      >
                        <Image
                          class="w-full"
                          sizes="(max-width: 640px) 100vw, 40vw"
                          style={{ aspectRatio: ASPECT_RATIO }}
                          src={img.url!}
                          alt={img.alternateName}
                          width={WIDTH}
                          height={HEIGHT}
                          // Preload LCP image for better web vitals
                          preload={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </label>
                    )
                    : (
                      <iframe
                        src={img.contentUrl?.replace(
                          "watch?v=",
                          "embed/",
                        )}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        class="w-full h-full max-w-full max-h-full z-20"
                      />
                    )}
                </Slider.Item>
              ))}
            </Slider>
          </div>
        </div>

        {/**  */}
        <div class="flex flex-row justify-between">
          <Slider.PrevButton
            class="no-animation hidden lg:flex items-center"
            disabled={false}
          >
            <Icon id="chevron-right" class="rotate-180 text-primary" />
          </Slider.PrevButton>
          {device === "mobile"
            ? (
              <ul
                class={clx(
                  "carousel carousel-center justify-center gap-3 px-3",
                  "rounded-full",
                  "border-[1px] border-slate-200",
                  "flex lg:hidden",
                  "max-w-40 h-6 mx-auto",
                  "overflow-x-auto",
                  "sm:overflow-y-auto",
                )}
                style={{ maxHeight: "600px" }}
              >
                {productMidia.map((_, index) => (
                  <li class="carousel-item w-3 h-full flex justify-center items-center">
                    <Slider.Dot
                      index={index}
                      className="disabled:bg-primary flex w-2.5 h-2.5 rounded-full bg-base-200"
                    >
                    </Slider.Dot>
                  </li>
                ))}
              </ul>
            )
            : (
              <ul
                class={clx(
                  "carousel carousel-center",
                  "flex justify-center gap-3",
                  "gap-2",
                  "max-w-full h-16",
                  "overflow-x-auto",
                  "sm:overflow-y-auto",
                )}
                style={{ maxHeight: "600px" }}
              >
                {productMidia.map((img, index) => (
                  <li class="carousel-item w-14 h-14 relative">
                    <Slider.Dot
                      index={index}
                      className="disabled:border-2 border-base-400 rounded overflow-hidden"
                      style={{ borderColor: "#011E41" }}
                    >
                      {img["@type"] === "ImageObject"
                        ? (
                          <Image
                            style={{ aspectRatio: "1 / 1" }}
                            class="object-cover w-14 h-14"
                            width={56}
                            height={56}
                            src={img.url!}
                            alt={img.alternateName}
                          />
                        )
                        : (
                          <div class="w-14 relative overflow-hidden">
                            <Icon
                              id="chevron-right"
                              class="absolute text-primary z-20 left-1/2 text-white"
                            />
                            <div className="absolute w-full h-full bg-black opacity-40 z-10">
                            </div>
                            <Image
                              style={{ aspectRatio: "1 / 1" }}
                              class="object-cover w-full h-full"
                              width={56}
                              height={56}
                              src={img.thumbnailUrl!}
                              alt={img.alternateName}
                            />
                          </div>
                        )}
                    </Slider.Dot>
                  </li>
                ))}
              </ul>
            )}
          <Slider.NextButton
            class="no-animation hidden lg:flex items-center h-16"
            disabled={false}
          >
            <Icon id="chevron-right" class="text-primary" />
          </Slider.NextButton>
        </div>
        <Slider.JS rootId={id} infinite={true} />
      </div>
      <ProductImageZoom
        id={zoomId}
        images={productMidia}
        width={700}
        height={Math.trunc(700 * HEIGHT / WIDTH)}
      />
    </>
  );
}

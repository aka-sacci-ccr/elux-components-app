import { ProductDetailsPage } from "apps/commerce/types.ts";
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

  // Filter images when image's alt text matches product name
  // More info at: https://community.shopify.com/c/shopify-discussions/i-can-not-add-multiple-pictures-for-my-variants/m-p/2416533
  const groupImages = isVariantOf?.image ?? pImages ?? [];
  const filtered = groupImages.filter((img) =>
    name?.includes(img.alternateName || "")
  );
  const images = filtered.length > 0 ? filtered : groupImages;

  return (
    <>
      <div
        id={id}
        class="flex flex-col"
      >
        {/* Image Slider */}
        <div class="col-start-1 col-span-1 sm:col-start-2">
          <div class="relative h-min flex-grow">
            <Slider class="carousel carousel-center gap-6 w-full">
              {images.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full"
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
                </Slider.Item>
              ))}
            </Slider>

            <Slider.PrevButton
              class="no-animation absolute left-2 disabled:opacity-40 hidden lg:flex items-center h-16 top-25"
              disabled
            >
              <Icon id="chevron-right" class="rotate-180" />
            </Slider.PrevButton>

            <Slider.NextButton
              class="no-animation absolute right-2 disabled:opacity-40 hidden lg:flex items-center h-16 top-25"
              disabled={images.length < 2}
            >
              <Icon id="chevron-right" />
            </Slider.NextButton>

            <div class="absolute top-2 right-2 bg-transparent w-full h-2/4 lg:h-4/5">
              <label class="btn btn-ghost sm:inline-flex w-full h-full" for={zoomId}>
              </label>
            </div>
          </div>
        </div>

        <div class="col-start-1 col-span-1 lg:max-w-25 lg:ml-12">
          {
            device === "mobile" ? (
              <ul
              class={clx(
                "carousel carousel-center justify-center gap-3",
                "rounded-full",
                "border-[1px] border-slate-200",
                "flex lg:hidden",
                "gap-2",
                "max-w-40 h-6 mx-auto",
                "overflow-x-auto",
                "sm:overflow-y-auto",
              )}
              style={{ maxHeight: "600px" }}
            >
              {images.map((_, index) => (
                <li class="carousel-item w-3 h-full flex justify-center items-center">
                  <Slider.Dot index={index} className="disabled:bg-[#EE405A] flex w-2.5 h-2.5 rounded-full bg-[#EBEBEB]">
                  </Slider.Dot>
                </li>
              ))}
            </ul>
            ) : (
              <ul
              class={clx(
                "carousel carousel-center",
                "hidden lg:flex",
                "gap-2",
                "max-w-full",
                "overflow-x-auto",
                "sm:overflow-y-auto",
              )}
              style={{ maxHeight: "600px" }}
            >
              {images.map((img, index) => (
                <li class="carousel-item w-16 h-16">
                  <Slider.Dot index={index} className="disabled:border-2 border-base-400 rounded overflow-hidden"
                  style={{borderColor: "#011E41"}}>
                    <Image
                      style={{ aspectRatio: "1 / 1" }}
                      class="object-cover w-full h-full"
                      width={64}
                      height={64}
                      src={img.url!}
                      alt={img.alternateName}
                    />
                  </Slider.Dot>
                </li>
              ))}
            </ul>
            )
          }
        </div>
        <Slider.JS rootId={id} />
      </div>
      <ProductImageZoom
        id={zoomId}
        images={images}
        width={700}
        height={Math.trunc(700 * HEIGHT / WIDTH)}
      />
    </>
  );
}

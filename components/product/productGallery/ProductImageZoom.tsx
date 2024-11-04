import type { ImageObject, VideoObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../ui/Icon.tsx";
import Modal from "../../../components/ui/Modal.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import { useId } from "../../../sdk/useId.ts";

export interface Props {
  id?: string;
  width: number;
  height: number;
  images: Array<ImageObject | VideoObject>;
}

function ProductImageZoom({ images, width, height, id = useId() }: Props) {
  const container = `${id}-container`;

  return (
    <Modal id={id}>
      <div
        id={container}
        class="w-screen h-[100vh] lg:w-11/12 max-w-7xl flex flex-col"
      >
        <span class="absolute top-5 left-5 lg:left-1/2 lg:top-6">
          1/{images.length}
        </span>
        <Slider class="carousel col-span-full col-start-1  h-3/5 w-full">
          {images.map((image, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full h-full justify-center items-center"
            >
              <div class="w-[90%] lg:w-[510px] lg:h-[410px] flex justify-center">
                {image["@type"] === "ImageObject"
                  ? (
                    <Image
                      style={{ aspectRatio: `auto` }}
                      src={image.url!}
                      alt={image.alternateName}
                      width={width}
                      height={height}
                      class="h-full w-auto"
                    />
                  )
                  : (
                    <iframe
                      src={image.contentUrl?.replace(
                        "watch?v=",
                        "embed/",
                      )}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      class="w-full h-[400px] max-w-full  lg:max-h-full z-20"
                    />
                  )}
              </div>
            </Slider.Item>
          ))}
        </Slider>
        <div class="flex px-2 max-w-[80%] overflow-x-auto px-3 lg:px-0 lg:max-w-[687px] mx-auto gap-4 lg:gap-6 relative">
          <Slider.PrevButton class="w-6 disabled:opacity-40">
            <Icon
              id="chevron-right"
              class="rotate-180 text-primary absolute left-0 bottom-4 lg:static"
            />
          </Slider.PrevButton>
          {images.map((img, index) => (
            <li class="carousel-item w-14 h-14 relative">
              <Slider.Dot
                index={index}
                className="border-2 border-transparent disabled:border-primary rounded overflow-hidden"
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
                    <div class="w-14 h-14 relative overflow-hidden">
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
          <Slider.NextButton class="w-6 disabled:opacity-40">
            <Icon
              id="chevron-right"
              class="text-primary absolute right-0 bottom-4 lg:static"
            />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={container} />
    </Modal>
  );
}

export default ProductImageZoom;

import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../ui/Icon.tsx";
import Modal from "../../../components/ui/Modal.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import { useId } from "../../../sdk/useId.ts";
import { clx } from "../../../utils/clx.ts";

export interface Props {
  id?: string;
  width: number;
  height: number;
  images: ImageObject[];
}

function ProductImageZoom({ images, width, height, id = useId() }: Props) {
  const container = `${id}-container`;

  return (
    <Modal id={id}>
      <div
        id={container}
        class="w-screen h-[100vh] lg:w-11/12 max-w-7xl flex flex-col"
      >
        <span class="absolute top-5 left-5 lg:left-1/2 lg:top-6">1/{images.length}</span>
        <Slider class="carousel col-span-full col-start-1  h-3/5 w-full"
        >
          {images.map((image, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full h-full justify-center items-center"
            >
              <div class="w-[90%] lg:w-[510px] lg:h-[410px] flex justify-center">
                <Image
                  style={{ aspectRatio: `auto` }}
                  src={image.url!}
                  alt={image.alternateName}
                  width={width}
                  height={height}
                  class="h-full w-auto"
                />
              </div>
            </Slider.Item>
          ))}
        </Slider>
        <div class="flex px-2 max-w-full lg:max-w-[687px] mx-auto lg:gap-6">
        <Slider.PrevButton class="w-6 disabled:opacity-40">
          <Icon id="chevron-right" class="rotate-180 text-primary" />
        </Slider.PrevButton>
        <ul
            class={clx(
              "carousel carousel-center",
              "flex mx-auto",
              "gap-2 lg:gap-5",
              "max-w-[70%] lg:max-w-full h-20 mt-4",
              "overflow-x-auto",
              "sm:overflow-y-auto",
            )}
          >
            {images.map((img, index) => (
              <li class="carousel-item w-14 h-14">
                 <Slider.Dot index={index} className="disabled:border-2 border-base-400 rounded overflow-hidden"
                 style={{borderColor: "#011E41"}}>
                  <Image
                    style={{ aspectRatio: "1 / 1" }}
                    class="object-cover w-full h-full"
                    width={57}
                    height={57}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>
          <Slider.NextButton class="w-6 disabled:opacity-40">
          <Icon id="chevron-right" class="text-primary"/>
        </Slider.NextButton>
          </div>

      </div>
      <Slider.JS rootId={container} />
    </Modal>
  );
}

export default ProductImageZoom;

import type { ImageObject, VideoObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../ui/Icon.tsx";
import Modal from "../../../components/ui/Modal.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import { useId } from "../../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";

export interface Props {
  id?: string;
  width: number;
  height: number;
  images: Array<ImageObject | VideoObject>;
  fatherSliderId: string;
}

const goToItem = (fatherSliderId: string, modalId: string): void => {
  const modal = document.getElementById(modalId) as HTMLInputElement;
  const container = document.getElementById(`${modalId}-container`);

  modal?.addEventListener("change", function () {
    if (!this.checked) return;

    const fatherDots = document.getElementById(fatherSliderId)
      ?.querySelectorAll<HTMLElement>("[data-dot]");
    const childDots = container?.querySelectorAll<HTMLElement>("[data-dot]");

    const disabledIndex = Array.from(fatherDots || []).findIndex((dot) =>
      dot.hasAttribute("disabled")
    );
    childDots?.[disabledIndex]?.click();
  });
};

function ProductImageZoom(
  { images, width, height, id = useId(), fatherSliderId }: Props,
) {
  const container = `${id}-container`;
  return (
    <Modal id={id}>
      <div
        id={container}
        class="w-screen h-[100vh] lg:w-11/12 max-w-7xl flex flex-col"
      >
        <Slider.Counter class="absolute top-5 left-5 lg:left-1/2 lg:top-6" />
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
        <div class="flex justify-center px-3 lg:px-0 w-full lg:max-w-[687px] mx-auto gap-4 lg:gap-6 relative">
          <Slider.PrevButton class="w-6" disabled={false}>
            <Icon
              id="chevron-right"
              class="rotate-180 text-primary absolute left-0 bottom-4 lg:static"
            />
          </Slider.PrevButton>
          <ul class="flex px-4 overflow-x-auto w-full mx-auto gap-1 justify-center lg:gap-4">
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
          </ul>
          <Slider.NextButton class="w-6" disabled={false}>
            <Icon
              id="chevron-right"
              class="text-primary absolute right-0 bottom-4 lg:static"
            />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={container} infinite={true} />
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(goToItem, fatherSliderId, id),
        }}
      />
    </Modal>
  );
}

export default ProductImageZoom;

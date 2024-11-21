import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";
import { clx } from "../../utils/clx.ts";
import Video from "apps/website/components/Video.tsx";
/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: BannerItem;
  /** @description mobile otimized image */
  mobile: BannerItem;
  /** @description Image's alt text */
  alt: string;
  /**
    @title Banner content
    */
  bannerType?: "video" | "imagem";
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
  };
}
export interface BannerItem {
  /** @description if you are using GIFs, prefer using videos */
  /** @title Video*/
  video?: VideoWidget;
  /** @title Image*/
  image?: ImageWidget;
  /** @title Width*/
  width?: number;
  /** @title Height*/
  height?: number;
}
export interface Props {
  images?: Banner[];
  /**
   * @description Use this options if the banner is the biggest banner of the screen
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description Time (in seconds) to start the autoplay of the carousel
   */
  interval?: number;
}
function BannerItem({ image, lcp, isDesktop }: {
  image: Banner;
  lcp?: boolean;
  isDesktop: boolean;
}) {
  const { alt, mobile, desktop, action } = image;

  const [video, width, height] = isDesktop
    ? [desktop.video, desktop.width ?? 1646, desktop.height ?? 429]
    : [mobile.video, mobile.width ?? 375, mobile.height ?? 375];
  return (
    <a
      href={action?.href ?? "#"}
      class="relative block overflow-y-hidden w-full"
    >
      {image.bannerType === "video"
        ? (
          <Video
            src={video || ""}
            autoplay
            width={width}
            height={height}
            loop
            muted
            class="w-full border-none"
          />
        )
        : (
          <Picture preload={lcp}>
            <Source
              media="(max-width: 767px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={mobile.image!}
              width={mobile.width ?? 375}
              height={mobile.height ?? 375}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={desktop.image!}
              width={desktop.width ?? 1646}
              height={desktop.height ?? 429}
            />
            <img
              class="object-cover w-full h-full"
              loading={lcp ? "eager" : "lazy"}
              src={desktop.image}
              alt={alt}
            />
          </Picture>
        )}
    </a>
  );
}
function Carousel(
  { images = [], preload, interval }: Props,
) {
  const id = useId();
  const device = useDevice();
  return (
    <div
      id={id}
      class={clx(
        "grid",
        "grid-rows-[1fr_80px_1fr_40px]",
        "grid-cols-[32px_1fr_32px]",
        "sm:grid-cols-[60px_1fr_60px] min-h-min",
        "w-full",
      )}
    >
      <div class="col-span-full row-span-full">
        <Slider class="carousel carousel-center w-full gap-6">
          {images.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem
                image={image}
                lcp={index === 0 && preload}
                isDesktop={device === "desktop"}
              />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      {images.length > 1 && (
        <>
          <div class="hidden sm:flex items-end justify-center z-10 col-start-1 row-start-2">
            <Slider.PrevButton
              class="hidden sm:flex disabled:invisible btn btn-lsm btn-circle no-animation btn-arrow-shadow !bg-white"
              disabled={false}
            >
              <Icon
                width={8}
                height={14}
                id="chevron-right"
                class="rotate-180 text-primary"
              />
            </Slider.PrevButton>
          </div>

          <div class="hidden sm:flex items-end justify-center z-10 col-start-3 row-start-2">
            <Slider.NextButton
              class="hidden sm:flex disabled:invisible btn btn-lsm btn-circle no-animation btn-arrow-shadow !bg-white"
              disabled={false}
            >
              <Icon
                id="chevron-right"
                class="text-primary"
                width={8}
                height={14}
              />
            </Slider.NextButton>
          </div>
        </>
      )}

      {images.length > 1 && (
        <div
          class={clx(
            "col-span-full row-start-4 z-10",
            "carousel justify-center gap-3 h-11",
          )}
        >
          <ul
            class={clx(
              "carousel carousel-center justify-center gap-3 px-5",
              "rounded-full",
              "border-[1px] border-slate-200",
              "flex",
              "h-6 mx-auto",
              "overflow-x-auto",
              "sm:overflow-y-auto",
            )}
          >
            {images.map((_, index) => (
              <li
                key={index}
                className="carousel-item w-3 h-full flex justify-center items-center"
              >
                <Slider.Dot
                  index={index}
                  className="disabled:bg-primary flex w-2.5 h-2.5 rounded-full bg-base-200"
                >
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}
export default Carousel;

import { ImageObject } from "apps/commerce/types.ts";
import { Colors } from "../../utils/types.ts";
import { clx } from "../../utils/clx.ts";
import { BG_COLORS, TEXT_COLORS } from "../../utils/constants.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  bannerColors: BannerColors[];
  banners?: ImageObject[] | null;
}

export interface BannerColors {
  /** @description Background color */
  bgColor: Colors;
  /** @description Title color */
  titleColor: Colors;
  /** @description Description color */
  descriptionColor: Colors;
}

export default function ProductInfoBanners(
  { bannerColors, banners }: Props,
) {
  const bannersConfigSize = bannerColors.length;
  return (
    <div className="w-full lg:mx-auto">
      {banners &&
        banners?.map((banner, index) => {
          const { bgColor, titleColor, descriptionColor } =
            bannerColors[index % bannersConfigSize];
          return (
            <div
              className={clx(
                `flex flex-col-reverse`,
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse",
                BG_COLORS[bgColor],
              )}
            >
              <Picture class="object-contain sm:w-2/4">
                <Source
                  media="(max-width: 640px)"
                  src={banner.url ?? ""}
                  width={375}
                  height={224}
                />
                <Source
                  media="(min-width: 640px)"
                  src={banner.url ?? ""}
                  width={640}
                  height={516}
                />
                <img
                  src={banner.url ?? ""}
                  alt={banner.name}
                  class="w-full"
                />
              </Picture>

              <div class="sm:w-2/4 flex items-center">
                <div className="w-full h-full flex flex-col  text-left justify-center gap-4 p-0 mx-6 my-10 sm:max-w-[400px] sm:gap-6 sm:mx-auto">
                  <span
                    className={clx("text-xl", TEXT_COLORS[titleColor])}
                  >
                    {banner.name}
                  </span>
                  <div
                    className={clx(
                      "text-base font-light",
                      TEXT_COLORS[descriptionColor],
                    )}
                    dangerouslySetInnerHTML={{
                      __html: banner.description ?? "",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

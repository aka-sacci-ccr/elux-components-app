import { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { Colors } from "../../utils/types.ts";
import { clx } from "../../utils/clx.ts";
import { BG_COLORS, TEXT_COLORS } from "../../utils/constants.tsx";

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
                `flex flex-col`,
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse",
                BG_COLORS[bgColor],
              )}
            >
              <Image
                alt={banner.description}
                src={banner.url || ""}
                width={640}
                height={516}
                class="object-contain sm:w-2/4"
              />

              <div class="sm:w-2/4 flex items-center">
                <div className="w-full max-w-[400px] h-full flex flex-col mx-auto text-left justify-center gap-4 p-5">
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

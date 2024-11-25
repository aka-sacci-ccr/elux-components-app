import { Product } from "apps/commerce/types.ts";
import { TextProps } from "../../utils/types.ts";
import Slider from "../ui/Slider.tsx";
import ProductCard from "./ProductCard.tsx";
import { type Resolved } from "@deco/deco";
import { clx } from "../../utils/clx.ts";

interface Props {
  skuStyle: Omit<TextProps, "text">;
  nameStyle: Omit<TextProps, "text">;
  products: Product[] | null;
  loader?: Resolved<Product | null>[];
  dotsColor: string;
  borderColor: string;
}

export default function ProductSlider(
  { skuStyle, nameStyle, products, dotsColor, borderColor }: Props,
) {
  return (
    <>
      <Slider class="carousel carousel-center w-full gap-2 sm:gap-4 px-1.5 max-lg:px-6">
        {products?.map((p, index) => (
          <Slider.Item
            index={index}
            class="w-[245px] min-w-[245px] pt-4 pb-4"
          >
            <ProductCard
              product={p}
              skuStyle={skuStyle}
              nameStyle={nameStyle}
            />
          </Slider.Item>
        ))}
      </Slider>
      <div class="flex justify-center max-lg:hidden">
        <ul
          class={clx(
            "carousel carousel-center justify-center gap-3 px-5 h-6",
            "rounded-full w-min",
            "border-[1px]",
            borderColor,
            "flex bg-white",
          )}
        >
          {products?.map((_, index) => (
            <li className="carousel-item w-3 h-full flex justify-center items-center has-[.hidden]:hidden group">
              <Slider.Dot
                index={index}
                className={clx(
                  "disabled:bg-primary disabled:border-primary flex w-2.5 h-2.5 rounded-full border border-white",
                  dotsColor,
                )}
              >
              </Slider.Dot>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

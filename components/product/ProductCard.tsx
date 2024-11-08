import { Product } from "apps/commerce/types.ts";
import { TextProps } from "../../utils/types.ts";
import { clx } from "../../utils/clx.ts";
import { TEXT_COLORS } from "../../utils/constants.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props extends CardStyling {
  product: Product;
}

export interface CardStyling {
  skuStyle: Omit<TextProps, "text">;
  nameStyle: Omit<TextProps, "text">;
}

const WIDTH = 164;
const HEIGHT = 164;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

export default function ProductCard({ product, skuStyle, nameStyle }: Props) {
  return (
    <div
      class="w-full p-4 flex flex-col gap-4 h-full"
      style={{
        boxShadow: "0px 4px 8px 0px #56697326, 0px 0px 1px 0px #56697326",
      }}
    >
      <div class="w-full px-6 py-4">
        {product?.image?.[0]?.url && (
          <Image
            src={product!.image[0]!.url!}
            alt={product.name}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "object-cover",
              "rounded w-full",
              "col-span-full row-span-full",
              "transition-opacity",
            )}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div class="flex flex-col gap-2">
        <span
          class={clx(
            TEXT_COLORS[skuStyle.fontColor],
            skuStyle.fontSize,
            skuStyle.fontWeight,
          )}
        >
          {product.sku}
        </span>
        <span
          class={clx(
            TEXT_COLORS[nameStyle.fontColor],
            nameStyle.fontSize,
            nameStyle.fontWeight,
            "line-clamp-3",
          )}
        >
          {product.name}
        </span>
        <div class="flex-grow" />
      </div>
    </div>
  );
}

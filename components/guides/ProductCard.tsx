import { Product } from "apps/commerce/types.ts";
import { clx } from "../../utils/clx.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  product: Product;
  siteTemplate: "elux" | "frigidaire";
}

const WIDTH = 64;
const HEIGHT = 64;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

export default function ProductCard({ product, siteTemplate }: Props) {
  const styling = siteTemplate === "elux" ? ELUX_STYLING : FRIGIDAIRE_STYLING;
  return (
    <a
      class={clx(styling.container, "p-2 flex flex-row gap-2")}
      href={product.url}
    >
      <div class="h-full min-h-[64px] min-w-[64px] self-center">
        {product?.image?.[0]?.url && (
          <Image
            src={product!.image[0]!.url!}
            alt={product.name}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "object-cover h-full",
            )}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div class={clx("flex flex-col self-center", styling.gap)}>
        <span class={styling.sku}>{product.productID}</span>
        <span class={clx(styling.title, "line-clamp-2")}>{product.name}</span>
      </div>
    </a>
  );
}

const ELUX_STYLING = {
  container: "border border-[#DEE7EA] rounded-sm",
  gap: "gap-1",
  sku: "text-secondary text-sm font-light",
  title: "text-primary text-sm font-medium",
};

const FRIGIDAIRE_STYLING = {
  container: "border border-neutral rounded-sm",
  gap: "gap-0",
  sku: "text-info text-sm font-light",
  title: "text-secondary text-sm font-medium",
};

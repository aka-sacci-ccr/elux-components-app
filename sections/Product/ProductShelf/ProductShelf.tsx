import { Product } from "apps/commerce/types.ts";
import { type Resolved } from "@deco/deco";
import Container, { SpacingConfig } from "../../container/Container.tsx";
import { AppContext } from "../../../mod.ts";
import { clx } from "../../../utils/clx.ts";
import { useId } from "../../../sdk/useId.ts";
import Slider from "../../../components/ui/Slider.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { CardStyling } from "../../../components/product/ProductCard.tsx";
import ProductSlider from "../../../components/product/ProductSlider.tsx";

export interface Props {
  /**
   * @title Title
   * @description Title of the product shelf
   */
  title: string;
  /**
   * @title Extra link
   * @description Extra link of the product shelf
   */
  extraLink?: ExtraLink;
  /**
   * @title Products
   * @description Use a tabbedShelf to have multiple groups of products and a productShelf to have a single group of products
   */
  products: TabbedShelf[] | ProductShelf;
  spacingConfig?: SpacingConfig;
}

interface ExtraLink {
  /**
   * @title Text
   * @description Text of the extra link
   */
  text?: string;
  /**
   * @title Href
   * @description Href of the extra link
   */
  href?: string;
}

interface ProductShelf {
  /**
   * @title Data
   * @description Products of the shelf
   */
  loader: Product[] | null;
}

interface TabbedShelf {
  /**
   * @title Tab title
   * @description Title of the tab
   */
  title: string;
  /**
   * @title Data
   * @description Products of the tab
   */
  loader: Resolved<Product[] | null>;
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const url = new URL(req.url);
  return {
    ...props,
    siteTemplate: ctx.siteTemplate,
    url: url,
  };
};

export default function ProductShelf(
  { title, extraLink, products, spacingConfig }: Props,
) {
  const id = useId();
  const isProductShelf = checkIsProductShelf(products);
  const {
    skuStyle,
    nameStyle,
    extraLinkFontStyle,
    titleFontStyle,
    borderColor,
    dotsColor,
  } = FRIGIDAIRE_STYLE;
  return (
    <Container spacing={spacingConfig} class="container">
      {/* Main div */}
      <div id={id} class="flex flex-col gap-6">
        {/* Title, extra link and slider buttons */}
        <div class="flex flex-row justify-between">
          {/* Title and extra link */}
          <div class="flex lg:flex-row lg:gap-6 flex-col gap-2 max-lg:px-6">
            <h2 class={titleFontStyle}>{title}</h2>
            {extraLink && (
              <a
                href={extraLink.href}
                class={clx(extraLinkFontStyle)}
              >
                {extraLink.text}
              </a>
            )}
          </div>
          {/* Slider buttons */}
          <div class="hidden lg:flex flex-row gap-2">
            <Slider.PrevButton
              class={clx(
                "hidden lg:flex disabled:invisible btn-circle !h-10 !w-10 !min-h-10 !min-w-10 no-animation justify-center items-center",
                "bg-white shadow-[0px_2px_4px_0px_#56697326]",
              )}
              disabled={false}
            >
              <Icon
                width={24}
                height={24}
                id="chevron-right"
                class="rotate-180 text-primary"
              />
            </Slider.PrevButton>
            <Slider.NextButton
              class={clx(
                "hidden lg:flex disabled:invisible btn-circle !h-10 !w-10 !min-h-10 !min-w-10 no-animation justify-center items-center",
                "bg-white shadow-[0px_2px_4px_0px_#56697326]",
              )}
              disabled={false}
            >
              <Icon
                id="chevron-right"
                class="text-primary"
                width={24}
                height={24}
              />
            </Slider.NextButton>
          </div>
        </div>
        {/* TODO: Tabs */}
        {/* Slider */}
        {isProductShelf &&
          (
            <ProductSlider
              skuStyle={skuStyle}
              nameStyle={nameStyle}
              products={products.loader}
              dotsColor={dotsColor}
              borderColor={borderColor}
            />
          )}
      </div>
      <Slider.JS rootId={id} infinite={true} />
    </Container>
  );
}

const checkIsProductShelf = (products: TabbedShelf[] | ProductShelf) =>
  "loader" in products;

const FRIGIDAIRE_STYLE = {
  titleFontStyle: "text-xl text-secondary content-center",
  extraLinkFontStyle: "text-info text-xs font-light underline content-center",
  skuStyle: {
    fontColor: "warning-content",
    fontSize: "text-xxs",
    fontWeight: "font-light",
  } as CardStyling["skuStyle"],
  nameStyle: {
    fontColor: "secondary",
    fontSize: "text-sm",
    fontWeight: "font-medium",
  } as CardStyling["nameStyle"],
  borderColor: "border-base-300",
  dotsColor: "bg-base-200",
};

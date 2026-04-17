import { Product } from "apps/commerce/types.ts";
import { type Resolved } from "@deco/deco";
import Container, { SpacingConfig } from "../../container/Container.tsx";
import { AppContext } from "../../../mod.ts";
import { clx } from "../../../utils/clx.ts";
import { useId } from "../../../sdk/useId.ts";
import Slider from "../../../components/ui/Slider.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { CardStyling } from "../../../components/product/ProductCard.tsx";
import ProductSlider, {
  Props as ProductSliderProps,
} from "../../../components/product/ProductSlider.tsx";
import { useScriptAsDataURI } from "@deco/deco/hooks";

export interface Props {
  /**
   * @title Title
   * @description Title of the product shelf
   */
  title?: string;
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

/**
 * @titleBy title
 */
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
  /** @hide true */
  initialProducts?: Product[] | null;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const url = new URL(req.url);
  const { products } = props;

  if (Array.isArray(products) && (products as TabbedShelf[]).length > 0) {
    const tabs = products as TabbedShelf[];
    const resolvedTabs = await Promise.all(
      tabs.map(async (tab) => {
        if (!tab.loader) return { ...tab, initialProducts: null };
        try {
          // deco already strips the "resolved" wrapper, so loader has __resolveType directly
          const { __resolveType, ...loaderProps } =
            tab.loader as unknown as Record<string, unknown>;
          // deno-lint-ignore no-explicit-any
          const tabProducts = await (ctx as any).invoke(
            __resolveType as string,
            loaderProps,
          ) as Product[] | null;
          return { ...tab, initialProducts: tabProducts };
        } catch {
          return { ...tab, initialProducts: null };
        }
      }),
    );
    return {
      ...props,
      products: resolvedTabs,
      siteTemplate: ctx.siteTemplate,
      url,
    };
  }

  return {
    ...props,
    siteTemplate: ctx.siteTemplate,
    url,
  };
};

function setupTabs(rootId: string, slotId: string, tabInputName: string) {
  const root = document.getElementById(rootId);
  const slot = document.getElementById(slotId);
  if (!root || !slot) return;

  function activatePanel(index: number) {
    // scroll the tab label into view
    const item = root!.querySelector<HTMLElement>(
      `[data-tab-index="${index}"]`,
    );
    const tabSlider = root!.querySelector<HTMLElement>("[data-tab-slider]");
    if (item && tabSlider) {
      tabSlider.scrollTo({ left: item.offsetLeft - tabSlider.offsetLeft });
    }
    // show/hide panels
    slot!.querySelectorAll<HTMLElement>("[data-tab-panel]").forEach((panel) => {
      panel.style.display =
        Number(panel.dataset.tabPanel) === index ? "" : "none";
    });
    // trigger resize so Slider.JS recalculates for the newly visible carousel
    globalThis.dispatchEvent(new Event("resize"));
  }

  root
    .querySelectorAll<HTMLInputElement>(`input[name="${tabInputName}"]`)
    .forEach((radio) => {
      radio.addEventListener("change", () => {
        activatePanel(Number(radio.value));
      });
    });
}

export default function ProductShelf(
  { title, extraLink, products, spacingConfig, siteTemplate }: ReturnType<
    typeof loader
  >,
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
    tabStyle,
  } = siteTemplate === "frigidaire" ? FRIGIDAIRE_STYLE : ELUX_STYLE;
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
                class={clx(extraLinkFontStyle, "underline-offset-[3px]")}
              >
                {extraLink.text}
              </a>
            )}
          </div>
          {/* Slider buttons */}
          <div class="hidden md:flex flex-row gap-2">
            <Slider.PrevButton
              class={clx(
                "hidden md:flex disabled:invisible btn-circle !h-10 !w-10 !min-h-10 !min-w-10 no-animation justify-center items-center",
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
                "hidden md:flex disabled:invisible btn-circle !h-10 !w-10 !min-h-10 !min-w-10 no-animation justify-center items-center",
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
        {/* Slider */}
        {isProductShelf
          ? (
            <ProductSlider
              skuStyle={skuStyle}
              nameStyle={nameStyle}
              products={products.loader}
              dotsColor={dotsColor}
              borderColor={borderColor}
              divId={id}
            />
          )
          : (
            <TabbedShelf
              products={products}
              divId={id}
              skuStyle={skuStyle}
              nameStyle={nameStyle}
              dotsColor={dotsColor}
              borderColor={borderColor}
              tabStyle={tabStyle}
              rootId={id}
            />
          )}
      </div>
    </Container>
  );
}

const checkIsProductShelf = (products: TabbedShelf[] | ProductShelf) =>
  "loader" in products;

const TabbedShelf = (
  {
    products,
    divId,
    skuStyle,
    nameStyle,
    dotsColor,
    borderColor,
    tabStyle,
    rootId,
  }:
    & {
      products: TabbedShelf[];
    }
    & Omit<ProductSliderProps, "products" | "loader">
    & {
      tabStyle: string;
      rootId: string;
    },
) => {
  const slotId = useId();
  const tabInputName = `product-tabs-${slotId}`;
  return (
    <div class="flex flex-col">
      <div
        class="carousel flex gap-1"
        role="tablist"
        data-tab-slider
      >
        {products.map(({ title }, index) => (
          <label
            key={index}
            class={clx(
              "carousel-item cursor-pointer",
              "has-[:checked]:cursor-default has-[:checked]:pointer-events-none",
              index === 0 && "max-lg:pl-6",
              index === products.length - 1 && "max-lg:pr-6",
            )}
            data-tab-index={index}
          >
            <div data-gtm-block-name="carrossel-categorias">
              <input
                type="radio"
                name={tabInputName}
                defaultChecked={index === 0}
                value={index}
                class="peer hidden"
              />
              <span
                class={clx(
                  "block px-6 py-2 border-b-2 transition-colors whitespace-nowrap",
                  tabStyle,
                )}
                data-gtm-element="category-tab"
                data-gtm-value={title}
              >
                {title}
              </span>
            </div>
          </label>
        ))}
      </div>
      <div id={slotId} class="min-h-[376px] lg:min-h-[400px]">
        {products.map(({ initialProducts }, index) => (
          <div
            key={index}
            data-tab-panel={index}
            style={index !== 0 ? "display:none" : ""}
          >
            <ProductSlider
              skuStyle={skuStyle}
              nameStyle={nameStyle}
              products={initialProducts ?? null}
              dotsColor={dotsColor}
              borderColor={borderColor}
              divId={divId}
              overrideGTM="carrossel-categorias"
            />
          </div>
        ))}
      </div>
      {/* Setup script: attaches change listeners to radio inputs for tab switching */}
      <script
        src={useScriptAsDataURI(setupTabs, rootId, slotId, tabInputName)}
      />
    </div>
  );
};

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
  tabStyle: clx(
    "peer-checked:border-b-primary peer-checked:text-secondary peer-checked:font-medium",
    "border-b-transparent text-info font-light",
    "hover:border-b-primary hover:text-secondary hover:font-medium",
  ),
};

const ELUX_STYLE = {
  titleFontStyle: "text-xl text-primary content-center font-medium",
  extraLinkFontStyle:
    "text-warning-content text-xs font-light underline content-center",
  skuStyle: {
    fontColor: "success-content",
    fontSize: "text-sm",
    fontWeight: "font-normal",
  } as CardStyling["skuStyle"],
  nameStyle: {
    fontColor: "primary",
    fontSize: "text-base",
    fontWeight: "font-medium",
  } as CardStyling["nameStyle"],
  borderColor: "border-[#DEE7EA]",
  dotsColor: "bg-base-200",
  tabStyle: clx(
    "peer-checked:border-b-primary peer-checked:text-primary peer-checked:font-medium",
    "border-b-transparent text-[#ADB4BD] font-light",
    "hover:border-b-primary hover:text-primary hover:font-medium",
  ),
};

export const LoadingFallback = (
  { spacingConfig, products, extraLink }: Partial<Props>,
) => {
  const hasProducts = products && !("loader" in products);
  return (
    <Container spacing={spacingConfig} class="container">
      <div class="flex flex-row justify-between">
        <div class="flex lg:flex-row lg:gap-6 flex-col gap-2 max-lg:px-6 lg:items-center">
          <div className="skeleton h-6 w-52"></div>
          {extraLink?.text && <div className="skeleton h-4 w-28"></div>}
        </div>
        <div class="flex flex-row gap-2">
          <div className="skeleton hidden md:flex disabled:invisible btn-circle !h-10 !w-10 !min-h-10 !min-w-10 rounded-full">
          </div>
          <div className="skeleton hidden md:flex disabled:invisible btn-circle !h-10 !w-10 !min-h-10 !min-w-10 rounded-full">
          </div>
        </div>
      </div>
      {hasProducts && (
        <div class="flex flex-row gap-6 mt-10 lg:mt-7 overflow-hidden max-lg:pl-6">
          {products.map((_) => (
            <div class="h-[24px] w-28 min-w-28 skeleton"></div>
          ))}
        </div>
      )}
      <div
        class={clx(
          "flex flex-row min-h-[376px] lg:min-h-[400px] lg:justify-center",
          "bg-white mt-3 gap-2 sm:gap-4 overflow-hidden max-lg:pl-6",
          !hasProducts && "mb-3",
        )}
      >
        <div className="flex w-[245px] min-w-[245px] pt-7 flex-col gap-4">
          <div className="skeleton h-56 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-[245px] min-w-[245px] pt-7 flex-col gap-4">
          <div className="skeleton h-56 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-[245px] min-w-[245px] pt-7 flex-col gap-4">
          <div className="skeleton h-56 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-[245px] min-w-[245px] pt-7 flex-col gap-4">
          <div className="skeleton h-56 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    </Container>
  );
};

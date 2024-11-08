import { ProductListingPage } from "apps/commerce/types.ts";
import { useId } from "../../sdk/useId.ts";
import { useDevice, useSection } from "@deco/deco/hooks";
import { clx } from "../../utils/clx.ts";
import Icon from "../ui/Icon.tsx";
import Sort from "./Sort.tsx";
import Filters from "./Filters.tsx";
import { ListingMainProps } from "../../sections/Product/ProductListing/ProductListingPage.tsx";
import {
  BG_COLORS,
  BORDER_CLASSES,
  BORDER_COLORS,
  HOVER_BG_COLORS_WITH_BORDER,
  ROUNDED_OPTIONS,
  TEXT_COLORS,
} from "../../utils/constants.tsx";
import ProductCard from "./ProductCard.tsx";
import { ButtonProps, RoundedOptions } from "../../utils/types.ts";

export interface Props {
  page: ProductListingPage;
  listingMain?: ListingMainProps;
  /** @hidden */
  partial?: "hideMore" | "hideLess";
  url: string;
}

export interface Layout {
  /**
   * @title Pagination
   * @description Format of the pagination
   */
  pagination?: "show-more" | "pagination";
  /**
   * @title Show more button props
   */
  buttonProps?: ButtonProps & {
    /** @description Rounded */
    rounded: RoundedOptions;
  };
}

const useUrlRebased = (overrides: string | undefined, base: string) => {
  let url: string | undefined = undefined;
  if (overrides) {
    const temp = new URL(overrides, base);
    const final = new URL(base);
    final.pathname = temp.pathname;
    for (const [key, value] of temp.searchParams.entries()) {
      final.searchParams.set(key, value);
    }
    url = final.href;
  }
  return url;
};

export default function SearchResult(
  { page, ...props }: Props,
) {
  const container = useId();
  const _controls = useId();
  const device = useDevice();
  const { listingMain, url, partial } = props;
  const { products, filters, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage -
    (listingMain?.startingPage ?? 0);
  const _offset = zeroIndexedOffsetPage * perPage;
  const results = (
    <span class="text-xxs font-light">
      {page.pageInfo.records} produtos
    </span>
  );
  const sortBy = sortOptions.length > 0 && (
    <Sort sortOptions={sortOptions} url={url} />
  );
  return (
    <>
      <div id={container} class="w-full">
        {partial
          ? <Result {...props} page={page} />
          : (
            <div class="container flex flex-col gap-4 sm:gap-5 w-full py-4 sm:py-5 px-5 sm:px-0">
              <div class="grid place-items-center grid-cols-1 sm:grid-cols-[245px_1fr] sm:gap-5">
                {device === "desktop" && (
                  <aside
                    class={clx(
                      "place-self-start flex flex-col gap-4 p-4",
                      TEXT_COLORS[
                        listingMain?.filtersFontColor ??
                          "primary"
                      ],
                    )}
                  >
                    <span class="text-xl font-semibold flex">
                      Geladeiras / Refrigeradores
                    </span>
                    <span class="text-base font-semibold flex">
                      Filtros
                    </span>
                    <hr class="border-t border-info-content" />
                    <Filters filters={filters} />
                  </aside>
                )}

                <div class="flex flex-col gap-9 w-full">
                  {device === "desktop" && (
                    <div
                      class={clx(
                        "flex justify-between items-center",
                        TEXT_COLORS[
                          listingMain
                            ?.filtersFontColor ??
                            "primary"
                        ],
                      )}
                    >
                      {results}
                      <div class="w-[156px]">
                        {sortBy}
                      </div>
                    </div>
                  )}
                  <Result {...props} page={page} />
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
}

function Result(props: Props) {
  const { listingMain, url, partial } = props;
  const page = props.page!;
  const { products, pageInfo } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage -
    (listingMain?.startingPage ?? 0);
  const _offset = zeroIndexedOffsetPage * perPage;
  const nextPageUrl = useUrlRebased(pageInfo.nextPage, url);
  const prevPageUrl = useUrlRebased(pageInfo.previousPage, url);
  const partialPrev = useSection({
    href: prevPageUrl,
    props: { partial: "hideMore" },
  });
  const partialNext = useSection({
    href: nextPageUrl,
    props: { partial: "hideLess" },
  });
  const buttonProps = listingMain?.layout?.buttonProps;
  const infinite = listingMain?.layout?.pagination !== "pagination";
  const buttonClass = clx(
    TEXT_COLORS[buttonProps?.fontColor ?? "white"],
    BG_COLORS[buttonProps?.color ?? "primary"],
    buttonProps?.borderColor ? BORDER_COLORS[buttonProps.borderColor] : "",
    buttonProps?.borderWidth && buttonProps.borderWidth !== "0"
      ? BORDER_CLASSES.full[buttonProps.borderWidth]
      : "",
    buttonProps?.hoverColor
      ? HOVER_BG_COLORS_WITH_BORDER[buttonProps.hoverColor]
      : "",
    ROUNDED_OPTIONS[buttonProps?.rounded ?? "none"],
  );

  return (
    <div class="grid grid-flow-row grid-cols-1 place-items-center">
      <div
        class={clx(
          "pb-2 sm:pb-10",
          (!prevPageUrl || partial === "hideLess") && "hidden",
        )}
      >
        <a
          rel="prev"
          class="btn btn-ghost"
          hx-swap="outerHTML show:parent:top"
          hx-get={partialPrev}
        >
          <span class="inline [.htmx-request_&]:hidden">
            Show Less
          </span>
          <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
        </a>
      </div>

      <div
        data-product-list
        class={clx(
          "grid items-center",
          "grid-cols-1 gap-2",
          "sm:grid-cols-3 sm:gap-5",
          "w-full",
        )}
      >
        {products?.map((_product, _index) => (
          <ProductCard
            product={_product}
            skuStyle={listingMain!.cardStyling!.skuStyle}
            nameStyle={listingMain!.cardStyling!.nameStyle}
          />
        ))}
      </div>

      <div class={clx("pt-2 sm:pt-10 w-full", "")}>
        {infinite
          ? (
            <div class="flex justify-center [&_section]:contents">
              <a
                rel="next"
                class={clx(
                  "btn btn-ghost px-4 min-h-10 max-h-10 md:mt-6",
                  "font-semibold",
                  (!nextPageUrl || partial === "hideMore") &&
                    "hidden",
                  buttonClass,
                )}
                hx-swap="outerHTML show:parent:top"
                hx-get={partialNext}
              >
                <span class="inline [.htmx-request_&]:hidden">
                  {buttonProps?.text}
                </span>
                <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
              </a>
            </div>
          )
          : (
            <div class={clx("join", infinite && "hidden")}>
              <a
                rel="prev"
                aria-label="previous page link"
                href={prevPageUrl ?? "#"}
                disabled={!prevPageUrl}
                class="btn btn-ghost join-item"
              >
                <Icon id="chevron-right" class="rotate-180" />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                rel="next"
                aria-label="next page link"
                href={nextPageUrl ?? "#"}
                disabled={!nextPageUrl}
                class="btn btn-ghost join-item"
              >
                <Icon id="chevron-right" />
              </a>
            </div>
          )}
      </div>
    </div>
  );
}

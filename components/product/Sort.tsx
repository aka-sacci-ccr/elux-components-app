import { ProductListingPage } from "apps/commerce/types.ts";
import { useScript } from "@deco/deco/hooks";
import { clx } from "../../utils/clx.ts";
const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";
export type Props = Pick<ProductListingPage, "sortOptions"> & {
  url: string;
  siteTemplate: "elux" | "frigidaire";
};
const getUrl = (href: string, value: string) => {
  const url = new URL(href);
  url.searchParams.delete(PAGE_QUERY_PARAM);
  url.searchParams.set(SORT_QUERY_PARAM, value);
  return url.href;
};
const labels: Record<string, string> = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Lançamento",
  "discount:desc": "Maior desconto",
};
function Sort({ sortOptions, url, siteTemplate }: Props) {
  const current = getUrl(
    url,
    new URL(url).searchParams.get(SORT_QUERY_PARAM) ?? "",
  );
  const options = sortOptions?.map(({ value, label }) => ({
    value: getUrl(url, value),
    label,
  }));

  return (
    <>
      <label for="sort" class="sr-only">Sort by</label>
      <select
        name="sort"
        class={clx(
          "select w-full rounded border-xs border-warning text-warning-content",
          "focus:border-warning",
          siteTemplate === "elux"
            ? "text-base font-medium"
            : "text-sm font-light pt-1",
        )}
        hx-on:change={useScript(() => {
          const select = event!.currentTarget as HTMLSelectElement;
          globalThis.location.href = select.value;
        })}
      >
        {options.map(({ value, label }) => (
          <option
            label={labels[label] ?? label}
            value={value}
            selected={value === current}
          >
            {label}
          </option>
        ))}
      </select>
    </>
  );
}
export default Sort;

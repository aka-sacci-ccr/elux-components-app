import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { clx } from "../../utils/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";
import ApplicableFilters from "../ui/ApplicableFilters.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  siteTemplate: "elux" | "frigidaire";
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { selected, label, siteTemplate, value, categoryKey }: FilterToggleValue & {
    siteTemplate: "elux" | "frigidaire";
    categoryKey: string;
  },
) {
  return (
    <li class="flex items-center gap-2">
      <label class="flex items-center gap-2 cursor-pointer">
        <ApplicableFilters.Input
          categoryKey={categoryKey}
          filterValue={value}
          checked={selected}
          class={clx(
            "w-4 h-4 appearance-none border rounded-sm cursor-pointer flex justify-center [&:checked::before]:self-center",
            siteTemplate === "elux"
              ? "checked:bg-white border-warning [&:checked::before]:content-[url('https://deco-sites-assets.s3.sa-east-1.amazonaws.com/elux-latam/53221bfd-3f69-4050-9677-6c6d4d767c50/check.png')] [&:checked::before]:-mt-[2px]"
              : "checked:border-none checked:bg-primary border-base-300 [&:checked::before]:content-[url('https://deco-sites-assets.s3.sa-east-1.amazonaws.com/elux-nola-us/453ebc96-5d1f-403a-a5c6-92f48dd206c0/check.png')]",
          )}
        />
        <span class="text-sm">{label}</span>
      </label>
    </li>
  );
}

function Filters({ filters, siteTemplate }: Props) {
  const id = useId();
  return (
    <>
      <ApplicableFilters class="w-full flex flex-col gap-5" id={id}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                    input:checked ~ label .arrow { transform: rotate(270deg); transition: transform 0.4s ease; }
                    input:not(:checked) ~ label .arrow { transform: rotate(90deg); transition: transform 0.4s ease; }
                    `,
          }}
        />
        <ul class="flex flex-col gap-5 p-0">
          {filters
            .filter(isToggle)
            .map((filter) => (
              <li class="flex flex-col gap-4">
                <CollapseFilters {...filter} siteTemplate={siteTemplate} />
              </li>
            ))}
        </ul>
        <div class="flex flex-col gap-2">
          <ApplicableFilters.ApplyBtn
            rel="next"
            class={clx(
              "btn btn-ghost px-4 min-h-10 max-h-10",
              "font-semibold bg-primary text-white",
            )}
          >
            Aplicar
          </ApplicableFilters.ApplyBtn>
          <ApplicableFilters.ClearBtn
            rel="next"
            class={clx(
              "btn btn-ghost px-4 min-h-10 max-h-10",
              "font-semibold bg-primary text-white",
            )}
          >
            Limpar
          </ApplicableFilters.ClearBtn>
        </div>
      </ApplicableFilters>
      <ApplicableFilters.JS rootId={id} />
    </>
  );
}

function CollapseFilters(
  props: FilterToggle & { siteTemplate: "elux" | "frigidaire" },
) {
  const id = useId();

  return (
    <div class="collapse collapse-plus rounded-none border-b border-base-200">
      <input class="hidden peer" type="checkbox" id={id} />

      <label htmlFor={id} class="pb-2 peer-checked:pb-0 cursor-pointer">
        <div class="collapse-title min-h-0 p-0">
          <div
            class={clx(
              "flex items-center justify-between h-full w-full",
            )}
          >
            <p class="font-light">{props.label}</p>
            <Icon
              id="chevron-right"
              class="ml-auto text-primary arrow pointer-events-none rotate-90"
              stroke="#19191a"
            />
          </div>
        </div>
      </label>

      <div class="collapse-content !p-0">
        <ul class="flex flex-col gap-6 py-6">
          {props.values.map((item) => {
            return (
              <ValueItem
                {...item}
                siteTemplate={props.siteTemplate}
                categoryKey={props.key}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Filters;

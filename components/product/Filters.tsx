import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { clx } from "../../utils/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ selected, label }: FilterToggleValue) {
  return (
    <div class="flex items-center gap-2">
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={selected} />
        <span class="text-sm">{label}</span>
      </label>
    </div>
  );
}

function Filters({ filters }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                    input:checked ~ label .arrow { transform: rotate(270deg); transition: transform 0.4s ease; }
                    input:not(:checked) ~ label .arrow { transform: rotate(90deg); transition: transform 0.4s ease; }
                    `,
        }}
      />
      <ul class="flex flex-col gap-5 p-4 sm:p-0">
        {filters
          .filter(isToggle)
          .map((filter) => (
            <li class="flex flex-col gap-4">
              <CollapseFilters {...filter} />
            </li>
          ))}
      </ul>
    </>
  );
}

function CollapseFilters(props: FilterToggle) {
  const id = useId();

  return (
    <div class="collapse collapse-plus rounded-none border-b border-base-200">
      <input class="hidden peer" type="checkbox" id={id} />

      <label htmlFor={id} class="pb-2 peer-checked:pb-0">
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
        <div class="flex flex-col gap-6 py-6">
          {props.values.map((item) => {
            return <ValueItem {...item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;

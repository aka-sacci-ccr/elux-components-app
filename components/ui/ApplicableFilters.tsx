import { useScript } from "@deco/deco/hooks";
import type { JSX } from "preact";

function ApplicableFilters(props: JSX.IntrinsicElements["div"]) {
  return <div {...props} />;
}

function FilterInput(
  { categoryKey, filterValue, ...props }: JSX.IntrinsicElements["input"] & {
    categoryKey: string;
    filterValue: string;
  },
) {
  return (
    <input
      data-filter-input
      data-category-key={categoryKey}
      data-filter-value={filterValue}
      type="checkbox"
      {...props}
    />
  );
}

function ClearFiltersButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-clear-filters type="button" {...props} />;
}

function ApplyFiltersButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-apply-filters type="button" {...props} />;
}

function JS({ rootId }: Props) {
  return (
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad, { rootId }) }}
    />
  );
}

export interface Props {
  rootId: string;
}

const onLoad = ({ rootId }: Props) => {
  function init() {
    const root = document.getElementById(rootId);
    const clearBtn = root?.querySelector<HTMLButtonElement>(
      "[data-clear-filters]",
    );
    const applyBtn = root?.querySelector<HTMLButtonElement>(
      "[data-apply-filters]",
    );
    const inputs = root?.querySelectorAll<HTMLInputElement>(
      "[data-filter-input]",
    );

    if (!root || !inputs) {
      console.warn("Missing necessary filter elements", {
        root,
        inputs,
      });
      return;
    }

    const handleApplyFilters = () => {
      const selectedFilters = new Map<string, string[]>();

      inputs.forEach((input) => {
        if (input.checked) {
          const filterValue = input.getAttribute(
            "data-filter-value",
          );
          const categoryKey = input.getAttribute(
            "data-category-key",
          );
          if (filterValue && categoryKey) {
            selectedFilters.set(categoryKey, [
              ...(selectedFilters.get(categoryKey) || []),
              filterValue,
            ]);
          }
        }
      });
      const newUrl = new URL(
        globalThis.location.pathname,
        globalThis.location.origin,
      );
      selectedFilters.forEach((values, key) => {
        newUrl.searchParams.set(key, values.join("_"));
      });

      globalThis.location.href = newUrl.toString();
    };

    const handleClearFilters = () => {
      inputs.forEach((input) => {
        input.checked = false;
      });
    };

    applyBtn?.addEventListener("click", handleApplyFilters);
    clearBtn?.addEventListener("click", handleClearFilters);
  }

  if (document.readyState === "complete") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
};

ApplicableFilters.Input = FilterInput;
ApplicableFilters.Clear = ClearFiltersButton;
ApplicableFilters.Apply = ApplyFiltersButton;
ApplicableFilters.JS = JS;
export default ApplicableFilters;

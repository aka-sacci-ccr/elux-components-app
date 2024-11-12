import { FilterToggle, FilterToggleValue } from "apps/commerce/types.ts";
import { clx } from "../../utils/clx.ts";
import Icon from "../ui/Icon.tsx";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import { LANGUAGE_DIFFS } from "../../utils/constants.tsx";

interface MenuProps {
  filters: FilterToggle[];
  language: "EN" | "ES";
  siteTemplate: "elux" | "frigidaire";
}

const onClick = (id: string) => {
  const input = document.getElementById(
    id,
  ) as HTMLInputElement;
  input.checked = !input.checked;
};

export function MenuMobile(
  { filters, language, siteTemplate }: MenuProps,
) {
  const [menuItems, titleColor] = siteTemplate === "frigidaire"
    ? [FrigidareMenuItems({ filters, language }), "text-secondary"]
    : [EluxMenuItems({ filters }), "text-neutral-content"];
  return (
    <div
      class={clx(
        "fixed inset-0 z-50",
        "opacity-0 invisible",
        "group-has-[#open-filters:checked]:visible group-has-[#open-filters:checked]:opacity-100",
        "transition-opacity duration-150",
        "bg-black/60",
      )}
    >
      <aside
        class={clx(
          "translate-x-full group-has-[#open-filters:checked]:-translate-x-0",
          "transition-transform duration-150",
          "group-has-[#open-filters:checked]:delay-150",
          "w-screen h-screen top-0 overflow-y-auto overflow-x-hidden fixed",
        )}
      >
        <div class="w-[90%] h-full float-right bg-white !opacity-100">
          <div class="h-[44px] bg-white w-full pt-2 px-2 flex flex-row items-center justify-between pl-4">
            <span
              class={clx(
                titleColor,
                "font-semibold",
              )}
            >
              {LANGUAGE_DIFFS[language].listingPage.filter}
            </span>
            <label
              class="h-9 w-9 flex items-center justify-center"
              htmlFor={"open-filters"}
            >
              <Icon id="close" class="text-primary" />
            </label>
          </div>
          <div class="flex flex-col gap-3.5 h-full w-full bg-white pt-2 px-4 text-secondary">
            <div>
              {menuItems}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

const FrigidareMenuItems = (
  { filters, language }: { filters: FilterToggle[]; language: "EN" | "ES" },
) => {
  return (
    <ul class="w-full h-full">
      {filters.map((filter) => {
        const id = useId();
        const onClickEvent = {
          "hx-on:click": useScript(
            onClick,
            id,
          ),
        };

        return (
          <li class="group border-b border-base-200 first:border-t">
            <input
              type="checkbox"
              class="hidden peer"
              id={id}
            />
            <div
              class={clx(
                "text-base font-normal leading-none h-[54px] flex justify-between items-center",
              )}
              {...onClickEvent}
            >
              <span class="flex items-center gap-2 h-full text-neutral-content">
                {filter.label}
              </span>
              <p>
                <Icon
                  class="text-primary"
                  id="chevron-right"
                />
              </p>
            </div>
            <SubmenuAside
              id={id}
              {...filter}
              language={language}
            />
          </li>
        );
      })}
    </ul>
  );
};

const EluxMenuItems = (
  { filters }: { filters: FilterToggle[] },
) => {
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
      <ul class="w-full h-full flex flex-col gap-3.5">
        {filters.map((filter) => {
          const id = useId();
          return (
            <li class="group border-b border-base-200 first:border-t first:pt-3.5">
              <div class="collapse collapse-plus rounded-none">
                <input
                  class="hidden peer"
                  type="checkbox"
                  id={id}
                />

                <label
                  htmlFor={id}
                  class="pb-3.5 peer-checked:pb-0"
                >
                  <div class="collapse-title min-h-0 p-0">
                    <div
                      class={clx(
                        "flex items-center justify-between h-full w-full",
                      )}
                    >
                      <p class="font-light">
                        {filter.label}
                      </p>
                      <Icon
                        id="chevron-right"
                        class="ml-auto text-primary arrow pointer-events-none rotate-90"
                        stroke="#19191a"
                      />
                    </div>
                  </div>
                </label>

                <div class="collapse-content !p-0">
                  <ul class="flex flex-col">
                    {filter.values.map((item) => {
                      return (
                        <li class="h-[54px] flex items-center w-full border-t border-base-200 ml-4 first:mt-2 first:ml-0 first:pl-4">
                          <label class="flex items-center gap-1 cursor-pointer w-full">
                            <input
                              type="checkbox"
                              class={clx(
                                "w-4 h-4 appearance-none border rounded-sm cursor-pointer flex justify-center [&:checked::before]:self-center",
                                "checked:bg-white border-warning [&:checked::before]:content-[url('https://deco-sites-assets.s3.sa-east-1.amazonaws.com/elux-latam/53221bfd-3f69-4050-9677-6c6d4d767c50/check.png')] [&:checked::before]:-mt-[2px]",
                              )}
                            />
                            <span class="text-base">
                              {item.label}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const SubmenuAside = (
  { id, label, values, language }: {
    id: string;
    label: string;
    values: FilterToggleValue[];
    language: "EN" | "ES";
  },
) => {
  return (
    <aside
      class={clx(
        "translate-x-full peer-checked:-translate-x-0 transition-all",
        "z-50 w-[90%] h-screen absolute top-0 right-0 bg-white text-secondary",
      )}
    >
      <div class="h-[44px] bg-white w-full pt-2 px-2 flex flex-row items-center justify-between pl-4">
        <span class="font-normal text-info">
          {LANGUAGE_DIFFS[language].listingPage.filter}&nbsp;
          <span class="text-secondary font-medium">{label}</span>
        </span>

        <label
          htmlFor={id}
          class="h-9 flex gap-2 items-center justify-between"
        >
          <Icon
            id="chevron-right"
            class="text-primary rotate-180"
          />
        </label>
      </div>
      <ul class="flex flex-col items-start justify-start pt-2 px-4 gap-2 h-full overflow-scroll max-h-[calc(100vh_-_52px)]">
        {values.map((value) => (
          <li class="group border-b border-base-200 first:border-t w-full">
            <div class="flex items-center gap-2 text-base font-normal leading-none h-[54px] justify-between">
              <label class="flex items-center gap-2 cursor-pointer w-full">
                <input
                  type="checkbox"
                  class={clx(
                    "w-4 h-4 border-base-300 appearance-none border checked:border-none rounded-sm cursor-pointer checked:bg-primary flex justify-center",
                    "[&:checked::before]:content-[url('https://deco-sites-assets.s3.sa-east-1.amazonaws.com/elux-nola-us/453ebc96-5d1f-403a-a5c6-92f48dd206c0/check.png')]",
                    "[&:checked::before]:-mt-[1px]",
                  )}
                />
                <span class="text-base">{value.label}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

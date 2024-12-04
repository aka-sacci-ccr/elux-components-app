import { AppContext } from "../../mod.ts";
import { clx } from "../../utils/clx.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useId } from "../../sdk/useId.ts";
import InformativeModal from "../../components/ui/InformativeModal.tsx";
export interface Props {
  /**
   * @title Title
   */
  title: string;
  /**
   * @title Description
   */
  description: string;
  /**
   * @title Auxiliary text
   */
  auxiliaryText: string;
  /**
   * @title Search section properties
   */
  searchSection: SearchSection;
  spacingConfig: SpacingConfig;
}

interface SearchSection {
  /**
   * @title Auxiliary text
   * @format rich-text
   */
  auxiliaryText: string;
  /**
   * @title Placeholder
   */
  placeholder: string;
  /**
   * @title Helper text
   */
  helperText: string;
  /**
   * @title Modal properties
   * @description Modal information texts
   */
  modalProps: ModalProps;
}

export interface ModalProps {
  title: string;
  /**
   * @title Description
   * @format rich-text
   */
  description: string;
  buttonText: string;
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  return {
    ...props,
    siteTemplate: ctx.siteTemplate,
    url: req.url,
  };
};

export default function GuidesCategories(props: ReturnType<typeof loader>) {
  const styling = props.siteTemplate === "elux"
    ? ELUX_STYLING
    : FRIGIDAIRE_STYLING;
  const modalId = useId();
  return (
    <Container spacing={props.spacingConfig} class="container">
      <div class="max-w-[687px] max-lg:px-6 flex flex-col">
        <h1 class={styling.title}>{props.title}</h1>
        <h2 class={clx(styling.description, "mt-6")}>
          {props.description}
        </h2>
        <p class={clx(styling.auxiliaryText, "mt-6")}>
          {props.auxiliaryText}
        </p>
        <div class="mt-6">
          Categories
        </div>
        <div
          class={clx(
            "w-full flex flex-col p-4",
            styling.searchSection.container,
          )}
        >
          <div
            class={clx("mb-4", styling.searchSection.auxiliaryText)}
            dangerouslySetInnerHTML={{
              __html: props.searchSection.auxiliaryText,
            }}
          />
          {/* Searchbar */}
          <div class="relative">
            <input
              type="text"
              placeholder={props.searchSection.placeholder}
              class={clx(
                "w-full bg-white",
                styling.searchSection.input,
              )}
            />
            <Icon
              id="search"
              class="text-primary absolute left-4 top-1/2 -translate-y-1/2"
              width={24}
              height={24}
            />
          </div>
          <div
            class={clx(
              styling.searchSection.helperText,
              "flex flex-row",
            )}
          >
            <label
              for={modalId}
              class="flex flex-row gap-1 lg:gap-2 mt-3 lg:mt-2 items-center cursor-pointer"
            >
              <Icon id="error" width={16} height={16} />
              <span>{props.searchSection.helperText}</span>
            </label>
            <input
              type="checkbox"
              class="hidden modal-toggle -z-50"
              id={modalId}
            />
            <div class="modal bg-[#C9C9CA] top-0 right-0 w-[100vw]">
              <InformativeModal
                modalId={modalId}
                siteTemplate={props.siteTemplate}
                modalProps={props.searchSection.modalProps}
              >
              </InformativeModal>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const ELUX_STYLING = {
  title: "text-primary text-2.5xl font-medium lg:text-3.5xl lg:font-semibold",
  description: "text-secondary text-base font-normal",
  auxiliaryText: "text-primary text-base font-medium",
  searchSection: {
    container: "bg-[#F4F5F7] rounded",
    auxiliaryText: "text-secondary text-base [&_strong]:font-medium",
    input:
      "border border-neutral rounded-sm pl-12 h-12 text-base placeholder:text-success-content text-secondary leading-6",
    helperText: "text-primary text-sm lg:text-base",
  },
};

const FRIGIDAIRE_STYLING = {
  title: "text-primary text-2.5xl lg:text-4xl font-semibold",
  description: "text-secondary text-base font-light",
  auxiliaryText: "text-secondary text-medium font-medium",
  searchSection: {
    container: "bg-[##F5F5F5] rounded",
    auxiliaryText: "text-secondary text-base",
    input:
      "border border-neutral rounded-sm pl-12 h-12 text-base placeholder:text-success-content text-secondary leading-6",
    helperText: "text-primary text-sm lg:text-base",
  },
};

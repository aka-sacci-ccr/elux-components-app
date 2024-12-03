import { AppContext } from "../../mod.ts";
import { clx } from "../../utils/clx.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";

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
  spacingConfig: SpacingConfig;
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
        <div class="mt-6">
          Searchbar
        </div>
      </div>
    </Container>
  );
}

const ELUX_STYLING = {
  title: "text-primary text-2.5xl font-medium lg:text-3.5xl lg:font-semibold",
  description: "text-secondary text-base font-normal",
  auxiliaryText: "text-primary text-base font-medium",
};

const FRIGIDAIRE_STYLING = {
  title: "text-primary text-2.5xl lg:text-4xl font-semibold",
  description: "text-secondary text-base font-light",
  auxiliaryText: "text-secondary text-medium font-medium",
};

import { AvailableIcons } from "../../components/ui/Icon.tsx";
import { LANGUAGE_DIFFS } from "../constants.tsx";

export const DEFAULT_DOMAINS = ["deno.dev", "decocdn.com", "localhost"];

export const iconMap: Record<string, AvailableIcons> = {
  WIDTH: "width-property",
  HEIGHT: "height-property",
  WEIGHT: "weight-property",
  DEPTH: "depth-property",
  BOX_WIDTH: "width-property",
  BOX_HEIGHT: "height-property",
  BOX_WEIGHT: "weight-property",
  BOX_DEPTH: "depth-property",
};

export type SortOptions = "name-asc" | "name-desc";

export const getSortOptions = (language: "EN" | "ES") => {
  return [
    { value: "name-asc", label: LANGUAGE_DIFFS[language].listingPage.nameAsc },
    {
      value: "name-desc",
      label: LANGUAGE_DIFFS[language].listingPage.nameDesc,
    },
  ];
};

export const DEFAULT_URL_PARAMS_TO_EXCLUDE = ["sort", "page"];

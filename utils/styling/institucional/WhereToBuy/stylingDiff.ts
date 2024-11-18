import {
  CountryCardStyle,
  StoreCardStyle,
} from "../../../../sections/Institutional/WhereToBuy.tsx";
import { TextProps } from "../../../types.ts";

const FRIGIDAIRE_COUNTRY_CARD_STYLE_DESKTOP = {
  fontColor: "secondary",
  titleFontSize: "text-base",
  hoverColor: "error-content",
  hoverColorBorder: "info-content",
  fontSize: "text-sm",
} as CountryCardStyle;

const FRIGIDAIRE_STORE_CARD_STYLE_DESKTOP = {
  fontColor: "secondary",
  titleFontSize: "text-base",
  descriptionFontSize: "text-sm",
  imagesSizes: {
    mobile: {
      width: 327,
      height: 148,
    },
    desktop: {
      height: 174,
      width: 333,
    },
  },
  hoverColorBorder: "neutral",
  grid: "3",
  gap: "5",
  colorBorder: "base-200",
  descriptionFontColor: "secondary",
} as StoreCardStyle;

const FRIGIDAIRE_COUNTRY_CARD_STYLE_MOBILE = {
  fontColor: "secondary",
  titleFontSize: "text-base",
  hoverColor: "error-content",
  hoverColorBorder: "info-content",
  fontSize: "text-sm",
} as CountryCardStyle;

const FRIGIDAIRE_STORE_CARD_STYLE_MOBILE = {
  fontColor: "secondary",
  titleFontSize: "text-base",
  descriptionFontSize: "text-sm",
  imagesSizes: {
    mobile: {
      width: 327,
    },
    desktop: {
      height: 174,
      width: 333,
    },
  },
  hoverColorBorder: "neutral",
  grid: "3",
  gap: "5",
  colorBorder: "base-200",
  descriptionFontColor: "secondary",
} as StoreCardStyle;

const FRIGIDAIRE_TITLE_TEXT_STYLE = {
  fontColor: "primary",
  fontSize: "text-2.5xl",
  fontWeight: "font-semibold",
} as Omit<TextProps, "text">;

const FRIGIDAIRE_DESCRIPTION_TEXT_STYLE = {
  fontColor: "base-content",
  fontSize: "text-sm",
} as Omit<TextProps, "text">;

const FRIGIDAIRE_MOBILE = {
  title: FRIGIDAIRE_TITLE_TEXT_STYLE,
  description: FRIGIDAIRE_DESCRIPTION_TEXT_STYLE,
  countryCardStyle: FRIGIDAIRE_COUNTRY_CARD_STYLE_MOBILE,
  storeCardStyle: FRIGIDAIRE_STORE_CARD_STYLE_MOBILE,
};

const FRIGIDAIRE_DESKTOP = {
  title: FRIGIDAIRE_TITLE_TEXT_STYLE,
  description: FRIGIDAIRE_DESCRIPTION_TEXT_STYLE,
  countryCardStyle: FRIGIDAIRE_COUNTRY_CARD_STYLE_DESKTOP,
  storeCardStyle: FRIGIDAIRE_STORE_CARD_STYLE_DESKTOP,
};

const stylingDiff = {
  frigidaire: {
    mobile: FRIGIDAIRE_MOBILE,
    desktop: FRIGIDAIRE_DESKTOP,
  },
  elux: {
    mobile: FRIGIDAIRE_MOBILE,
    desktop: FRIGIDAIRE_DESKTOP,
  },
};

export default stylingDiff;

import { ImageWidget } from "apps/admin/widgets.ts";
import { AvailableIcons } from "../components/ui/Icon.tsx";
import { AppContext } from "../mod.ts";

export interface Props {
  /**
   * @title Countries
   */
  countries: CountryCardContent[];
}

/**
 * @titleBy label
 */
export interface CountryCardContent {
  /**
   * @title Country name
   */
  label: string;
  /**
   * @title Country id
   */
  id: string;
  /**
   * @title Icon
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon?: AvailableIcons;
  /**
   * @title Country avaliable stores
   */
  countryStores?: CountryStores[];
}

export interface CountryStores {
  /**
   * @title Desktop store image
   */
  desktopImage: ImageWidget;
  /**
   * @title Mobile store image
   */
  mobileImage: ImageWidget;
  /**
   * @title Title
   */
  title: string;
  /**
   * @title Description
   */
  description: string;
  /**
   * @title Href
   */
  href?: string;
  /**
   * @title Disable Card Border
   */
  disableBorder?: boolean;
}

/**
 * @title Where to buy
 * @description Save an get the where to buy data.
 *
 * @param props - The props for the where to buy.
 * @param req - The request object.
 * @param ctx - The application context.
 * @returns A promise that resolves to a where to buy.
 */
export default function loader(
  { countries }: Props,
  _req: Request,
  _ctx: AppContext,
): CountryCardContent[] | undefined {
  if (!countries || countries.length === 0) {
    return undefined;
  }
  return countries;
}

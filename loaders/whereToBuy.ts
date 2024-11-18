import { ImageWidget } from "apps/admin/widgets.ts";
import { AvailableIcons } from "../components/ui/Icon.tsx";
import { AppContext } from "../mod.ts";

export interface Props {
  /**
   * @title Countries
   */
  countries: CountryCardContent[];
  /**
   * @ignore
   */
  fromIndex?: number;
}

export interface CountryCardContent {
  /**
   * @title Country name
   */
  label: string;
  /**
   * @title Country flag
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

export default function loader(
  { countries, fromIndex }: Props,
  _req: Request,
  _ctx: AppContext,
): CountryCardContent[] | undefined {
  if (!countries || countries.length === 0) {
    return undefined;
  }

  if (fromIndex) {
    return [countries[fromIndex]];
  }

  return countries;
}

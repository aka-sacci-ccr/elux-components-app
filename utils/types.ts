import { ImageWidget } from "apps/admin/widgets.ts";
import { AvailableIcons } from "../components/ui/Icon.tsx";

export type Colors =
  | "base-100"
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "base-200"
  | "base-300"
  | "base-400"
  | "base-content"
  | "primary-content"
  | "secondary-content"
  | "accent-content"
  | "neutral-content"
  | "success-content"
  | "warning-content"
  | "error-content"
  | "info-content"
  | "black"
  | "white"
  | "transparent";

export type FontStyle = "font-noto-sans";

export type FontWeight =
  | "font-thin"
  | "font-extralight"
  | "font-light"
  | "font-normal"
  | "font-medium"
  | "font-semibold"
  | "font-bold"
  | "font-extrabold"
  | "font-black";

export type FontSize =
  | "text-xxs"
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-lg"
  | "text-xl"
  | "text-2xl"
  | "text-2.5xl"
  | "text-3xl"
  | "text-3.5xl"
  | "text-4xl";

export type GapSizes =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "10"
  | "12"
  | "16"
  | "20"
  | "24"
  | "28";

export interface TextProps {
  /**
   * @title Text
   */
  text: string;
  /**
   * @title Font color
   */
  fontColor: Colors;
  /**
   * @title Font size
   * @description text-xs: 12px, text-sm: 14px, text-base: 16px, text-lg: 18px, text-xl: 20px, text-2xl: 24px, text-2.5xl: 28px, text-3xl: 30px, text-3.5xl: 34px, text-4xl: 36px,
   */
  fontSize: FontSize;
  /**
   * @title Font weight
   */
  fontWeight?: FontWeight;
}

export interface ButtonProps {
  /**
   * @title Text
   */
  text: string;
  /**
   * @title Background color
   */
  color: Colors;
  /**
   * @title Background color hover
   */
  hoverColor?: Colors;
  /**
   * @title Border color
   */
  borderColor?: Colors;
  /**
   * @title Border width
   */
  borderWidth?: "0" | "1" | "2";
  /**
   * @title Font color
   */
  fontColor: Colors;
}

export type RoundedOptions =
  | "none"
  | "sm"
  | "regular"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface WidthAndHeight {
  width?: number;
  height?: number;
}

export interface Success {
  success: boolean;
  message?: string;
}

export interface SubmitContactFormProps {
  country?: string;
  serialNumber?: string;
  subject?: string;
  message?: string;
  personName?: string;
  personSurname?: string;
  personEmail?: string;
  personPhone?: string;
  status?: string;
}

export interface Image {
  desktop: ImageProps;
  mobile: ImageProps;
  /**
   * @title Alt
   */
  alt: string;
}

export interface ImageProps {
  /**
   * @title Image
   */
  src: ImageWidget;
  /**
   * @title Size
   */
  sizing: WidthAndHeight;
}

export interface IconProps {
  icon?: AvailableIcons;
  color?: Colors;
  size?: number;
}

export interface Category {
  /**
   * @description Category identifier
   */
  identifier: string;
  /**
   * @title Name
   * @description Category name
   */
  value: string;
  /**
   * @description Category description
   */
  description?: string;
  /**
   * @title Category father
   * @format dynamic-options
   * @options elux-components-app/loaders/product/avaliableCategories.ts
   */
  subjectOf?: string;
  /**
   * @title Image
   * @format image-uri
   */
  image?: string;
}

export interface ProductCategory {
  /**
   * @title Category ID
   * @format dynamic-options
   * @options elux-components-app/loaders/product/avaliableCategories.ts
   */
  subjectOf: string;
}

export interface Product {
  sku: string;
  name: string;
  /**
   * @title Slug
   */
  productID: string;
  /**
   * @title Brand
   * @format dynamic-options
   * @options elux-components-app/loaders/product/avaliableBrands.ts
   */
  brand?: string;
  description?: string;
  gtin?: string;
  /**
   * @format datetime
   */
  releaseDate?: string;
}

export interface Brand {
  /**
   * @title Brand Id
   */
  identifier: string;
  name: string;
  description?: string;
  /**
   * @format image-uri
   */
  logo?: string;
}

export interface AdditionalProperty {
  /**
   * @title Property Identificator
   */
  propertyID:
    | "OTHER"
    | "HEIGHT"
    | "WIDTH"
    | "DEPTH"
    | "WEIGHT"
    | "BOX_HEIGHT"
    | "BOX_WIDTH"
    | "BOX_DEPTH"
    | "BOX_WEIGHT"
    | "BOX_OTHER";
  /**
   * @title Property Name
   */
  name: string;
  value: string;
  unitCode?: string;
  unitText?: string;
}

export interface Description {
  name: string;
  /**
   * @format rich-text
   */
  value: string;
  /**
   * @format image-uri
   */
  image?: string;
}

export interface ImageProduct {
  /**
   * @title Image
   * @format image-uri
   */
  url: string;
  /**
   * @title Alt
   */
  disambiguatingDescription?: string;
  /**
   * @title Image type
   */
  additionalType?:
    | "INFO_BANNER"
    | "MAIN_BANNER"
    | "PRODUCT_IMAGE"
    | "MAIN_BANNER_MOBILE";
  /**
   * @title Title (if banner)
   */
  name?: string;
  /**
   * @format rich-text
   * @title Description (if banner)
   */
  description?: string;
}

export interface Video {
  /**
   * @title Video
   * @format video-uri
   */
  contentUrl: string;
  /**
   * @title Thumbnail
   * @format image-uri
   */
  thumbnailUrl: string;
  duration?: string;
}

export interface AvaliableIn {
  /**
   * @title Site
   * @format dynamic-options
   * @options elux-components-app/loaders/product/avaliableSites.ts
   */
  domain: string;
}

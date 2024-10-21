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

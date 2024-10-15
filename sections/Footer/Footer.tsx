import { type ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Section from "../../components/ui/Section.tsx";
import Collumn, {
  Props as CollumProps,
} from "../../components/footer/Collumn.tsx";
import { Colors, GapSizes, TextProps } from "../../utils/types.ts";
import { clx } from "../../utils/clx.ts";
import { BG_COLORS, GAP_SIZES, TEXT_COLORS } from "../../utils/constants.tsx";
import Container, { SpacingConfig } from "../container/Container.tsx";

/** @titleBy alt */
export interface ImageProps {
  src: ImageWidget;
  alt: string;
  link: string;
  isBlank?: boolean;
  width?: number;
  height?: number;
}

interface Props {
  /** @description Logo */
  logo?: ImageWidget;
  /** @description An title that goes in Logo Place */
  title?: TextProps;
  /** @title Background color*/
  bgColor?: Colors;
  /** @title Justify columns dinamically*/
  justifyBetween?: boolean;
  /** @title Hide divisor*/
  hideHr?: boolean;
  /** @title Columns*/
  collumns: CollumProps[];
  /** @title Description */
  richText: RichText;
  /** @title Extra media */
  extraMedia: ExtraMediaProps;
  /** @description Reverse column in mobile */
  reverseColumn?: boolean;
  spacing?: SpacingConfig;
}

interface ExtraMediaProps {
  title?: TextProps;
  description?: TextProps;
  images?: ImageProps[];
  gap?: GapSizes;
}

function Footer({
  logo,
  richText,
  collumns,
  title,
  bgColor,
  spacing,
  justifyBetween,
  hideHr,
  extraMedia,
  reverseColumn,
}: Props) {
  return (
    <Container spacing={spacing}>
      <footer
        class={clx(
          "text-sm",
          bgColor && BG_COLORS[bgColor],
        )}
      >
        {/* Main div container */}
        <div class="flex flex-col gap-8 container pt-12 pb-8">
          {/* Image/Title div */}
          <div class="max-md:px-4">
            {logo ? <Image src={logo} width={150} height={18} /> : title && (
              <p
                class={clx(
                  title.fontSize,
                  TEXT_COLORS[title.fontColor],
                  "font-semibold",
                )}
              >
                {title.text}
              </p>
            )}
          </div>
          {/* Column and HR  */}
          <div>
            <div
              class={clx(
                "flex md:gap-5 max-md:flex-col text-secondary max-md:px-4",
                justifyBetween && "justify-between",
              )}
            >
              {collumns.map((props) => <Collumn {...props} />)}
            </div>
            {!hideHr && <hr class="border-base-300 sm:mt-6" />}
          </div>
          {/* Rich text and social networks  */}
          <div
            class={clx(
              "flex max-lg:justify-center max-md:px-4",
              extraMedia?.gap && GAP_SIZES[extraMedia.gap],
              reverseColumn ? "max-lg:flex-col-reverse" : "max-lg:flex-col",
            )}
          >
            {/* Rich text */}
            <div
              class="text-xxs text-info"
              dangerouslySetInnerHTML={{ __html: richText }}
            />
            {/* Extra media */}
            <div class="flex flex-col gap-2 min-w-[245px]">
              {/* Title of extra media */}
              {extraMedia.title && (
                <p
                  class={clx(
                    extraMedia.title.fontSize,
                    TEXT_COLORS[extraMedia.title.fontColor],
                    "font-bold",
                  )}
                >
                  {extraMedia.title.text}
                </p>
              )}
              {/* Description of extra media */}
              {extraMedia.description && (
                <p
                  class={clx(
                    extraMedia.description.fontSize,
                    TEXT_COLORS[extraMedia.description.fontColor],
                    "pb-2",
                  )}
                >
                  {extraMedia.description.text}
                </p>
              )}
              {/* Images from extra media */}
              {extraMedia.images && extraMedia.images.length > 0 && (
                <div class="flex flex-row gap-2.5 h-full items-center">
                  {extraMedia.images?.map((
                    { src, alt, link, height, isBlank, width },
                  ) => (
                    <a
                      href={link}
                      target={isBlank ? "_blank" : "_self"}
                      rel={isBlank ? "noopener noreferrer" : ""}
                    >
                      <Image
                        class="flex-shrink"
                        src={src}
                        alt={alt}
                        height={height || 44}
                        width={width || 96}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    </Container>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="1145px" />;

export default Footer;

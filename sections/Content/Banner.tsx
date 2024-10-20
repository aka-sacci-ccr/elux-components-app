import { Picture, Source } from "apps/website/components/Picture.tsx";
import {
  BG_COLORS,
  GAP_SIZES,
  PADDING_SIZES,
  TEXT_COLORS,
} from "../../utils/constants.tsx";
import { clx } from "../../utils/clx.ts";
import { Colors, GapSizes, Image, TextProps } from "../../utils/types.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";

export interface Props {
  /**
   * @title Background Color
   */
  backgroundColor: Colors;
  /**
   * @title Title
   */
  title: TextProps;
  /**
   * @title Descriptions
   */
  description: TextProps;
  /**
   * @title Image
   */
  image: Image;
  /**
   * @title Url
   */
  link?: Partial<TextProps> & { url?: string };
  /**
   * @title Gap between text
   */
  textGap: GapSizes;
  /**
   * @title Gap between image and text
   */
  imageGap: GapSizes;
  /**
   * @title Use banner in full width
   */
  fullWidth?: boolean;
  /**
   * @title Invert the Image/Text position in desktop
   */
  invertPosition?: boolean;
  /**
   * @title Spacing config
   */
  spacing?: SpacingConfig;
}

export default function Banner(
  {
    backgroundColor,
    title,
    description,
    image,
    link,
    textGap,
    imageGap,
    fullWidth,
    spacing,
    invertPosition
  }: Props,
) {
  return (
    <Container
      spacing={spacing}
      class={clx(
        !fullWidth ? "container max-sm:px-6" : BG_COLORS[backgroundColor],
      )}
    >
      <div
        class={clx(
          "flex flex-col-reverse container",
          GAP_SIZES[imageGap],
          !fullWidth && BG_COLORS[backgroundColor],
          invertPosition ? "lg:flex-row" : "lg:flex-row-reverse"
        )}
      >
        <div
          class={clx(
            "flex flex-col max-lg:px-6 lg:pb-0 self-center",
            GAP_SIZES[textGap],
            !fullWidth && PADDING_SIZES.left[imageGap],
            PADDING_SIZES.bottom[imageGap],
          )}
        >
          <p
            class={clx(
              title.fontSize,
              title.fontWeight,
              TEXT_COLORS[title.fontColor],
            )}
          >
            {title.text}
          </p>
          <p
            class={clx(
              description.fontSize,
              description.fontWeight,
              TEXT_COLORS[description.fontColor],
            )}
          >
            {description.text}
          </p>
          {link && link.text && (
            <a
              class={clx(
                TEXT_COLORS[link?.fontColor ?? "white"],
                link.fontSize,
                link.fontWeight,
                "underline mt-6.5 sm:mt-2",
              )}
              href={link.url}
            >
              {link.text}
            </a>
          )}
        </div>
        <Picture class="h-min">
          <Source
            media="(max-width: 1024px)"
            src={image.mobile.src}
            width={image.mobile.sizing.width ?? 375}
            height={image.mobile.sizing.height ?? 210}
          />
          <Source
            media="(min-width: 1024px)"
            src={image.desktop.src}
            width={image.desktop.sizing.width ?? 510}
            height={image.desktop.sizing.height ?? 300}
          />
          <img
            src={image.desktop.src}
            alt={image.alt}
            class="max-lg:w-full object-cover max-w-none"
          />
        </Picture>
      </div>
    </Container>
  );
}

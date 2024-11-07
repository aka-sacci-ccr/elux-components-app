import {
  BreadcrumbList,
  ListItem,
  Product,
  ProductDetailsPage,
} from "apps/commerce/types.ts";
import ProductMainBanner from "../../../components/product/ProductMainBanner.tsx";
import ProductInfoBanners, {
  BannerColors,
} from "../../../components/product/ProductInfoBanners.tsx";
import ProductMain from "../../../components/product/ProductMain.tsx";
import ProductDetails from "../../../components/product/ProductDetails.tsx";
import Container, { SpacingConfig } from "../../container/Container.tsx";
import Breadcrumb, {
  Props as BreadcrumbProps,
} from "../../Content/Breadcrumb.tsx";
import {
  Colors,
  FontSize,
  RoundedOptions,
  TextProps,
} from "../../../utils/types.ts";
import { AppContext } from "../../../mod.ts";

interface ProductPageProps {
  /** @description product loader of the page */
  page: ProductDetailsPage | null;
  /** @description Props of PDP breadcrumb */
  breadcrumbProps: PDPBreadcrumbProps;
  /** @description Define alternating banners colors */
  bannersProps: BannerColors[];
  /** @description Product main colors */
  productMain: ProductMainProps;
  /** @description Spacing config */
  spacing?: SpacingConfig;
}

export interface ProductMainProps {
  /** @description Buy button */
  buyButton: BuyButtonProps;
  /** @description Product name section */
  productName?: ProductNameProps;
  /** @description Background color */
  bgColor?: Colors;
  /** @description Product description tabs */
  tabs?: TabProps;
  /** @title Quantity of no image descriptions */
  /** @description Merge description with no image in mobile */
  mergeQuantity?: number;
}

interface BuyButtonProps {
  /** @description Is button disabled */
  isDisabled: boolean;
  /** @description Redirect to */
  redirectTo: string;
  /** @description Rounded */
  rounded: RoundedOptions;
}

interface ProductNameProps {
  /** @description Position of SKU/Name */
  position?: "1" | "2";
  /** @title Product name props */
  title?: Omit<TextProps, "text">;
  /** @title SKU props */
  sku?: Omit<TextProps, "text">;
}

interface PDPBreadcrumbProps extends
  Omit<
    BreadcrumbProps,
    "items" | "fontColor" | "spacing" | "disableContainer"
  > {
  /** @description Breadcrumb icon color */
  iconColor: Colors;
  /** @description Breadcrumb font color */
  breadcrumbColor: Colors;
  /** @description Max qty of items in breadcrumb */
  maxItems?: number;
  /** @description Hide product name in breadcrumb */
  hideProductName?: boolean;
  /** @description Override first item of breadcrumb */
  overrideFirst?: {
    item: string;
    url: string;
  };
}

interface TabProps {
  /** @description Styling of the enabled tab */
  enabledTab?: Omit<TextProps, "text"> & { underlineColor?: Colors };
  /** @description Styling of the disabled tab */
  disabledTab?: Omit<TextProps, "text"> & { underlineColor?: Colors };
  /** @description Styling of the titles of each section */
  titles?: Omit<TextProps, "text">;
  /** @title Styling of the tabs content */
  productDescription?: ProductDescriptionProps;
  /** @title Styling of the tech sheet table */
  techSheet?: TechSheetProps[];
}

export interface ProductDescriptionProps {
  /** @description Styling of the title of each grid */
  title?: Omit<TextProps, "text">;
  /** @description Size of the descriptions */
  descriptionSize?: FontSize;
}

export interface TechSheetProps {
  /** @description Background color */
  bgColor: Colors;
  /** @description Description color and weight */
  descriptionProps: Omit<TextProps, "text" | "fontSize">;
  /** @description Value color and weight */
  valueProps: Omit<TextProps, "text" | "fontSize">;
}

export const loader = (
  props: ProductPageProps,
  _req: Request,
  ctx: AppContext,
) => {
  return {
    language: ctx.language,
    ...props,
  };
};

export default function ProductPage(
  { page, bannersProps, spacing, breadcrumbProps, language, productMain }:
    ReturnType<
      typeof loader
    >,
) {
  if (!page) return <></>;
  const { product, breadcrumbList } = page;
  const { image, additionalProperty, description } = product;

  const breadcrumbItems = getBreadcrumbItems(
    breadcrumbList,
    breadcrumbProps,
    product,
  );

  const infoBannerImages = image?.filter((image) =>
    image.additionalType === "INFO_BANNER"
  );

  return (
    <Container class="flex flex-col" spacing={spacing}>
      <div class="my-6 max-w-[1280px] sm:w-[1280px] sm:pl-10 mx-auto">
        <Breadcrumb
          {...breadcrumbProps}
          items={breadcrumbItems}
          fontColor={breadcrumbProps.iconColor}
          disableContainer={true}
        />
      </div>
      <ProductMainBanner product={product} />
      <ProductInfoBanners
        banners={infoBannerImages}
        bannerColors={bannersProps}
      />
      <ProductMain
        page={page}
        productMain={productMain}
        language={language}
      />
      <ProductDetails
        additionalProperty={additionalProperty}
        description={description}
        language={language}
        productMain={productMain}
      />
    </Container>
  );
}

const sortAndFilterBreadcrumbItems = (items: ListItem[]): ListItem[] =>
  Object.values(
    [...items].sort((a, b) =>
      a.position === b.position
        ? a.item.localeCompare(b.item)
        : a.position - b.position
    ).reduce((acc, item) => ({
      ...acc,
      [item.position]: acc[item.position] || item,
    }), {} as Record<number, ListItem>),
  );

const getBreadcrumbItems = (
  breadcrumbList: BreadcrumbList,
  breadcrumbProps: PDPBreadcrumbProps,
  product: Product,
) => {
  const orderedBreadcrumbList = sortAndFilterBreadcrumbItems(
    [
      ...breadcrumbList.itemListElement,
      ...breadcrumbProps.overrideFirst
        ? [{
          "@type": "ListItem" as const,
          position: 0,
          ...breadcrumbProps.overrideFirst,
        }]
        : [],
    ],
  ).slice(
    0,
    (breadcrumbProps.maxItems ?? 3) -
      (breadcrumbProps.hideProductName ? 0 : 1),
  );
  const breadcrumbItems = orderedBreadcrumbList.map(({ item, url }) => ({
    label: item,
    href: url,
    overrideFontColor: breadcrumbProps.breadcrumbColor,
  }));

  if (!breadcrumbProps.hideProductName) {
    breadcrumbItems.push({
      label: product.name!,
      overrideFontColor: "primary",
      href: undefined,
    });
  }

  return breadcrumbItems;
};

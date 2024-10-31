import { ListItem, ProductDetailsPage } from "apps/commerce/types.ts";
import ProductMainBanner from "../../../components/product/ProductMainBanner.tsx";
import ProductInfoBanners from "../../../components/product/ProductInfoBanners.tsx";
import ProductMain from "../../../components/product/ProductMain.tsx";
import ProductDetails from "../../../components/product/ProductDetails.tsx";
import Container, { SpacingConfig } from "../../container/Container.tsx";
import Breadcrumb, {
  Props as BreadcrumbProps,
} from "../../Content/Breadcrumb.tsx";
import { Colors } from "../../../utils/types.ts";

interface ProductPageProps {
  /** @description product loader of the page */
  page: ProductDetailsPage | null;

  breadcrumbProps:
    & Omit<
      BreadcrumbProps,
      "items" | "fontColor" | "spacing" | "useGreaterContainer"
    >
    & {
      iconColor: Colors;
      breadcrumbColor: Colors;
      maxItems?: number;
      hideProductName?: boolean;
    };
  infoBanners: {
    backgroundColor: {
      /** @description Primary background component */
      primary: string;
      /** @description Secondary background component */
      secondary: string;
    };
    titleColor: {
      /** @description Primary title color */
      primary: string;
      /** @description Secondary title color */
      secondary: string;
    };
    contentColor: {
      /** @description Primary text color */
      primary: string;
      /** @description Secondary text color */
      secondary: string;
    };
  };
  productMain: {
    buyButton: {
      /** @description Button background color */
      background: string;
      /** @description Button text color */
      textColor: string;
    };
  };
  spacing?: SpacingConfig;
}
const sortAndFilterItems = (items: ListItem[]): ListItem[] =>
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

export default function ProductPage(
  { page, infoBanners, spacing, breadcrumbProps }: ProductPageProps,
) {
  if (!page) return <></>;
  const { product, breadcrumbList } = page;
  const { image, additionalProperty, description } = product;

  const orderedBreadcrumbList = sortAndFilterItems(
    breadcrumbList.itemListElement,
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

  const mainBannerImages = image?.filter((image) =>
    image.additionalType === "MAIN_BANNER" ||
    image.additionalType === "MAIN_BANNER_MOBILE"
  );
  const infoBannerImages = image?.filter((image) =>
    image.additionalType === "INFO_BANNER"
  );

  /*     console.log("------ main banner -----------");
    console.log(mainBannerImages);
    console.log("------ info banners -----------");
    console.log(infoBannerImages); */

  return (
    <Container class="flex flex-col" spacing={spacing}>
      <div class="my-6 sm:mt-6 sm:mb-8 max-w-[1280px] sm:w-[1280px] sm:pl-10 mx-auto">
        <Breadcrumb
          {...breadcrumbProps}
          items={breadcrumbItems}
          fontColor={breadcrumbProps.iconColor}
          disableContainer={true}
        />
      </div>
      <ProductMainBanner images={mainBannerImages} />
      <ProductInfoBanners
        images={infoBannerImages}
        titleColor={infoBanners.titleColor}
        contentColor={infoBanners.contentColor}
        backgroundColor={infoBanners.backgroundColor}
      />
      <ProductMain />
      <ProductDetails
        additionalProperty={additionalProperty}
        description={description}
      />
    </Container>
  );
}

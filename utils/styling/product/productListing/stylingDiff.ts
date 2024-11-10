import {
  ListingMainProps,
  PLPBreadcrumbProps,
} from "../../../../sections/Product/ProductListing/ProductListingPage.tsx";

const ELUX_DEFAULT = {
  breadcrumbProps: {
    iconColor: "secondary",
    breadcrumbColor: "primary",
    overrideFirst: {
      item: "Home",
      url: "/",
    },
    iconSize: 16,
    fontSize: "text-sm",
    fontWeight: "font-normal",
    gap: "1",
    hoverUnderline: true,
  } as PLPBreadcrumbProps,
  listingMain: {
    filtersFontColor: "neutral-content",
    cardStyling: {
      skuStyle: {
        fontColor: "success-content",
        fontSize: "text-sm",
        fontWeight: "font-normal",
      },
      nameStyle: {
        fontColor: "primary",
        fontSize: "text-base",
        fontWeight: "font-medium",
      },
    },
    layout: {
      pagination: "show-more",
      buttonProps: {
        text: "Show more",
        color: "white",
        hoverColor: "white",
        borderColor: "primary",
        borderWidth: "1",
        fontColor: "primary",
        rounded: "regular",
      },
    },
    startingPage: 1,
  } as ListingMainProps,
};

const FRIGIDAIRE_DEFAULT = {
  breadcrumbProps: {
    iconColor: "primary",
    breadcrumbColor: "secondary",
    overrideFirst: {
      item: "Home",
      url: "/",
    },
    iconSize: 16,
    fontSize: "text-sm",
    fontWeight: "font-normal",
    gap: "1",
  } as PLPBreadcrumbProps,
  listingMain: {
    filtersFontColor: "neutral-content",
    cardStyling: {
      skuStyle: {
        fontColor: "success-content",
        fontSize: "text-sm",
        fontWeight: "font-normal",
      },
      nameStyle: {
        fontColor: "primary",
        fontSize: "text-base",
        fontWeight: "font-medium",
      },
    },
    layout: {
      pagination: "show-more",
      buttonProps: {
        text: "Show more",
        color: "white",
        hoverColor: "white",
        borderColor: "primary",
        borderWidth: "1",
        fontColor: "primary",
        rounded: "regular",
      },
    },
    startingPage: 1,
  } as ListingMainProps,
};

export const productListingStylingDiffs = {
  elux: {
    desktop: ELUX_DEFAULT,
    mobile: {
      ...ELUX_DEFAULT,
      breadcrumbProps: {
        iconColor: "primary",
        breadcrumbColor: "primary",
        iconSize: 16,
        fontSize: "text-sm",
        fontWeight: "font-normal",
        gap: "1",
        hoverUnderline: true,
        icon: "dots-frigidaire",
      } as PLPBreadcrumbProps,
    },
  },
  frigidaire: { desktop: FRIGIDAIRE_DEFAULT, mobile: FRIGIDAIRE_DEFAULT },
};

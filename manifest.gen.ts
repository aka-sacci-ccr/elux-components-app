// DO NOT EDIT. This file is generated by deco.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $$$$$$$$$0 from "./actions/category/submit.ts";
import * as $$$$$$$$$1 from "./actions/category/update/submit.ts";
import * as $$$$$$$$$2 from "./actions/contact/submit.ts";
import * as $$$$$$$$$3 from "./actions/domains/submit.ts";
import * as $$$$$$$$$4 from "./actions/filters/submit.ts";
import * as $$$$$$$$$5 from "./actions/filters/update/submit.ts";
import * as $$$$$$$$$6 from "./actions/product/submit.ts";
import * as $$$$$$$$$7 from "./actions/product/submitDocuments.ts";
import * as $$$$$$$$$8 from "./actions/product/update/basicData.ts";
import * as $$$0 from "./loaders/guides/categories.ts";
import * as $$$1 from "./loaders/guides/productDocuments.ts";
import * as $$$2 from "./loaders/guides/products.ts";
import * as $$$3 from "./loaders/guides/suggestions.ts";
import * as $$$4 from "./loaders/menu.ts";
import * as $$$5 from "./loaders/product/avaliableBrands.ts";
import * as $$$6 from "./loaders/product/avaliableCategories.ts";
import * as $$$7 from "./loaders/product/avaliableFiltersGroups.ts";
import * as $$$8 from "./loaders/product/avaliableSites.ts";
import * as $$$9 from "./loaders/product/avaliableSkus.ts";
import * as $$$10 from "./loaders/product/details/productDetails.ts";
import * as $$$11 from "./loaders/product/list/productList.ts";
import * as $$$12 from "./loaders/product/listing/productListing.ts";
import * as $$$13 from "./loaders/testShelf.ts";
import * as $$$14 from "./loaders/whereToBuy.ts";
import * as $$$$$$22 from "./sections/blog/BlogListing.tsx";
import * as $$$$$$23 from "./sections/blog/BlogListingBreadcrumb.tsx";
import * as $$$$$$26 from "./sections/blog/BlogpostBanner.tsx";
import * as $$$$$$27 from "./sections/blog/BlogpostBreadcrumb.tsx";
import * as $$$$$$28 from "./sections/blog/BlogpostContent.tsx";
import * as $$$$$$24 from "./sections/blog/BlogSearch.tsx";
import * as $$$$$$25 from "./sections/blog/BlogShelf.tsx";
import * as $$$$$$0 from "./sections/Component.tsx";
import * as $$$$$$29 from "./sections/container/Container.tsx";
import * as $$$$$$1 from "./sections/Content/Banner.tsx";
import * as $$$$$$2 from "./sections/Content/Breadcrumb.tsx";
import * as $$$$$$3 from "./sections/Content/Cards.tsx";
import * as $$$$$$4 from "./sections/Content/CategoryCards.tsx";
import * as $$$$$$5 from "./sections/Content/HelpCards.tsx";
import * as $$$$$$6 from "./sections/Content/TextCards.tsx";
import * as $$$$$$7 from "./sections/Content/Toast.tsx";
import * as $$$$$$8 from "./sections/Footer/Footer.tsx";
import * as $$$$$$9 from "./sections/Header/Header.tsx";
import * as $$$$$$10 from "./sections/Images/BannersMatcher.tsx";
import * as $$$$$$11 from "./sections/Images/Carousel.tsx";
import * as $$$$$$12 from "./sections/Institutional/GuidesCategories.tsx";
import * as $$$$$$13 from "./sections/Institutional/GuidesDocuments.tsx";
import * as $$$$$$14 from "./sections/Institutional/GuidesProducts.tsx";
import * as $$$$$$15 from "./sections/Institutional/Policy.tsx";
import * as $$$$$$16 from "./sections/Institutional/Support.tsx";
import * as $$$$$$17 from "./sections/Institutional/WhereToBuy.tsx";
import * as $$$$$$18 from "./sections/Product/ProductDetails/ProductPage.tsx";
import * as $$$$$$19 from "./sections/Product/ProductListing/ProductListingPage.tsx";
import * as $$$$$$20 from "./sections/Product/ProductShelf/ProductShelf.tsx";
import * as $$$$$$21 from "./sections/Social/ContactForm.tsx";

const manifest = {
  "loaders": {
    "elux-components-app/loaders/guides/categories.ts": $$$0,
    "elux-components-app/loaders/guides/productDocuments.ts": $$$1,
    "elux-components-app/loaders/guides/products.ts": $$$2,
    "elux-components-app/loaders/guides/suggestions.ts": $$$3,
    "elux-components-app/loaders/menu.ts": $$$4,
    "elux-components-app/loaders/product/avaliableBrands.ts": $$$5,
    "elux-components-app/loaders/product/avaliableCategories.ts": $$$6,
    "elux-components-app/loaders/product/avaliableFiltersGroups.ts": $$$7,
    "elux-components-app/loaders/product/avaliableSites.ts": $$$8,
    "elux-components-app/loaders/product/avaliableSkus.ts": $$$9,
    "elux-components-app/loaders/product/details/productDetails.ts": $$$10,
    "elux-components-app/loaders/product/list/productList.ts": $$$11,
    "elux-components-app/loaders/product/listing/productListing.ts": $$$12,
    "elux-components-app/loaders/testShelf.ts": $$$13,
    "elux-components-app/loaders/whereToBuy.ts": $$$14,
  },
  "sections": {
    "elux-components-app/sections/blog/BlogListing.tsx": $$$$$$22,
    "elux-components-app/sections/blog/BlogListingBreadcrumb.tsx": $$$$$$23,
    "elux-components-app/sections/blog/BlogpostBanner.tsx": $$$$$$26,
    "elux-components-app/sections/blog/BlogpostBreadcrumb.tsx": $$$$$$27,
    "elux-components-app/sections/blog/BlogpostContent.tsx": $$$$$$28,
    "elux-components-app/sections/blog/BlogSearch.tsx": $$$$$$24,
    "elux-components-app/sections/blog/BlogShelf.tsx": $$$$$$25,
    "elux-components-app/sections/Component.tsx": $$$$$$0,
    "elux-components-app/sections/container/Container.tsx": $$$$$$29,
    "elux-components-app/sections/Content/Banner.tsx": $$$$$$1,
    "elux-components-app/sections/Content/Breadcrumb.tsx": $$$$$$2,
    "elux-components-app/sections/Content/Cards.tsx": $$$$$$3,
    "elux-components-app/sections/Content/CategoryCards.tsx": $$$$$$4,
    "elux-components-app/sections/Content/HelpCards.tsx": $$$$$$5,
    "elux-components-app/sections/Content/TextCards.tsx": $$$$$$6,
    "elux-components-app/sections/Content/Toast.tsx": $$$$$$7,
    "elux-components-app/sections/Footer/Footer.tsx": $$$$$$8,
    "elux-components-app/sections/Header/Header.tsx": $$$$$$9,
    "elux-components-app/sections/Images/BannersMatcher.tsx": $$$$$$10,
    "elux-components-app/sections/Images/Carousel.tsx": $$$$$$11,
    "elux-components-app/sections/Institutional/GuidesCategories.tsx": $$$$$$12,
    "elux-components-app/sections/Institutional/GuidesDocuments.tsx": $$$$$$13,
    "elux-components-app/sections/Institutional/GuidesProducts.tsx": $$$$$$14,
    "elux-components-app/sections/Institutional/Policy.tsx": $$$$$$15,
    "elux-components-app/sections/Institutional/Support.tsx": $$$$$$16,
    "elux-components-app/sections/Institutional/WhereToBuy.tsx": $$$$$$17,
    "elux-components-app/sections/Product/ProductDetails/ProductPage.tsx":
      $$$$$$18,
    "elux-components-app/sections/Product/ProductListing/ProductListingPage.tsx":
      $$$$$$19,
    "elux-components-app/sections/Product/ProductShelf/ProductShelf.tsx":
      $$$$$$20,
    "elux-components-app/sections/Social/ContactForm.tsx": $$$$$$21,
  },
  "actions": {
    "elux-components-app/actions/category/submit.ts": $$$$$$$$$0,
    "elux-components-app/actions/category/update/submit.ts": $$$$$$$$$1,
    "elux-components-app/actions/contact/submit.ts": $$$$$$$$$2,
    "elux-components-app/actions/domains/submit.ts": $$$$$$$$$3,
    "elux-components-app/actions/filters/submit.ts": $$$$$$$$$4,
    "elux-components-app/actions/filters/update/submit.ts": $$$$$$$$$5,
    "elux-components-app/actions/product/submit.ts": $$$$$$$$$6,
    "elux-components-app/actions/product/submitDocuments.ts": $$$$$$$$$7,
    "elux-components-app/actions/product/update/basicData.ts": $$$$$$$$$8,
  },
  "name": "elux-components-app",
  "baseUrl": import.meta.url,
};

export type Manifest = typeof manifest;

export default manifest;

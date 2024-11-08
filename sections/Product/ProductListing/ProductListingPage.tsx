import { ProductListingPage as PLP } from "apps/commerce/types.ts";
import { Colors } from "../../../utils/types.ts";
import Breadcrumb, {
  Props as BreadcrumbProps,
} from "../../Content/Breadcrumb.tsx";
import { AppContext } from "../../../mod.ts";
import Container, { SpacingConfig } from "../../container/Container.tsx";
import ListingPageBanner from "../../../components/product/ListingPageBanner.tsx";
import SearchResult, {
  Layout,
} from "../../../components/product/SearchResult.tsx";
import { CardStyling } from "../../../components/product/ProductCard.tsx";

export interface Props {
  page: PLP | null;
  /** @description Props of PDP breadcrumb */
  breadcrumbProps: PLPBreadcrumbProps;
  /** @description Product Listing main props */
  listingMain?: ListingMainProps;
  /** @description Spacing config */
  spacing?: SpacingConfig;
}

export interface ListingMainProps {
  /** @description Font color for filters */
  filtersFontColor?: Colors;
  /** @description Card styling config */
  cardStyling: CardStyling;
  layout?: Layout;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

interface PLPBreadcrumbProps extends
  Omit<
    BreadcrumbProps,
    "items" | "fontColor" | "spacing" | "disableContainer"
  > {
  /** @description Breadcrumb icon color */
  iconColor: Colors;
  /** @description Breadcrumb font color */
  breadcrumbColor: Colors;
  /** @description Override first item of breadcrumb */
  overrideFirst?: {
    item: string;
    url: string;
  };
}

export const loader = (
  props: Props,
  req: Request,
  ctx: AppContext,
) => {
  return {
    language: ctx.language,
    url: req.url,
    ...props,
  };
};

export default function ProductListingPage(
  { breadcrumbProps, spacing, page, url, listingMain }: ReturnType<
    typeof loader
  >,
) {
  if (!page) return <NotFound />;
  return (
    <Container class="flex flex-col" spacing={spacing}>
      <div class="my-6 max-w-[1280px] sm:w-[1280px] sm:pl-10 lg:mx-auto">
        <Breadcrumb
          {...breadcrumbProps}
          items={[{
            label: "Product Category",
          }]}
          fontColor={breadcrumbProps.iconColor}
          disableContainer={true}
        />
      </div>
      <ListingPageBanner
        image="https://deco-sites-assets.s3.sa-east-1.amazonaws.com/elux-latam/c35db32c-304c-4e57-a09a-c5b395dae644/072ae6028195b95f090be37ca0be5b9b.png"
        description="New Electrolux products"
      />
      <SearchResult
        page={page}
        url={url}
        listingMain={listingMain}
      />
    </Container>
  );
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

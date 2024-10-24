import { Product } from "apps/commerce/types.ts";
import { AvaliableIn } from "../../utils/types.ts";
import {
  AdditionalProperty,
  Description,
  ImageProduct,
  Product as BaseProduct,
  ProductCategory,
  Video,
} from "../../utils/types.ts";
import { AppContext } from "apps/records/mod.ts";
import { logger } from "@deco/deco/o11y";
import { insertProduct } from "../../utils/product/submitProduct.ts";

export interface Props {
  /**
   * @title Base info
   */
  product: BaseProduct;
  categories: ProductCategory[];
  additionalProperties: AdditionalProperty[];
  descriptions: Description[];
  images: ImageProduct[];
  videos?: Video[];
  avaliableIn: AvaliableIn[];
}

export default async function submit(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Product | { success: boolean; message: string }> {
  const {
    product,
    categories,
    additionalProperties,
    avaliableIn,
    descriptions,
    images,
    videos,
  } = props;
  const productBrand = product.brand?.split("---");

  try {
    await insertProduct({ ...props, ctx });
    return {
      "@type": "Product",
      ...product,
      brand: {
        "@type": "Brand",
        name: productBrand ? productBrand[1] ?? "" : "",
        identifier: productBrand ? productBrand[0] ?? "" : "",
      },
      additionalProperty: [
        ...additionalProperties.map((prop) => ({
          "@type": "PropertyValue" as const,
          ...prop,
        })),
        ...categories.map(({ subjectOf }) => {
          const category = subjectOf.split("---");
          return {
            "@type": "PropertyValue" as const,
            propertyID: "CATEGORY",
            name: category[1] ?? undefined,
            value: category[0] ?? undefined,
          };
        }),
        ...avaliableIn.map(({ site }) => {
          const siteAvaliable = site.split("---");
          return {
            "@type": "PropertyValue" as const,
            propertyID: "AVALIABLEIN",
            name: siteAvaliable[1] ?? undefined,
            value: siteAvaliable[0] ?? undefined,
          };
        }),
        ...descriptions.map(({ name, value, image }) => {
          return {
            "@type": "PropertyValue" as const,
            propertyID: "DESCRIPTION",
            name,
            value,
            image,
          };
        }),
      ],
      image: images?.map((i) => ({
        "@type": "ImageObject" as const,
        ...i,
        additionalType: i.additionalType ? "BANNER" : "IMAGE",
      })),
      video: videos?.map((v) => ({
        "@type": "VideoObject" as const,
        ...v,
      })),
    };
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: e.message,
    };
  }
}

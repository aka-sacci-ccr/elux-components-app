import { AppContext } from "apps/records/mod.ts";
import {
  AdditionalProperty,
  AvaliableIn,
  ImageProduct,
  Product,
  ProductCategory,
  ProductDocument,
  ProductMeasurements,
  Video,
} from "../types.ts";
import {
  additionalProperties,
  avaliableIn,
  descriptions,
  images,
  productCategories,
  productDocuments,
  productMeasurements,
  products,
  videos,
} from "../../db/schema.ts";
import { Props as SubmitProductProps } from "../../actions/product/submit.ts";
import { Description } from "../types.ts";
import { eq } from "drizzle-orm";
import { DEFAULT_DOMAINS } from "./constants.ts";

export async function insertBaseData(product: Product, ctx: AppContext) {
  const records = await ctx.invoke.records.loaders.drizzle();
  const productBrand = product.brand?.split("---");
  await records.insert(products).values({
    ...product,
    brand: productBrand ? productBrand[0] ?? "" : "",
  });
}

export async function insertCategories(
  categories: ProductCategory[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records.insert(productCategories).values(
    categories.map(({ subjectOf }) => {
      const category = subjectOf.split("---");
      return {
        subjectOf: category[0],
        product: sku,
      };
    }),
  );
}

export async function insertMeasurements(
  measurements: ProductMeasurements[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records.insert(productMeasurements).values(
    measurements.map((props) => {
      return {
        ...props,
        subjectOf: sku,
      };
    }),
  );
}

export async function insertAdditionalProperties(
  productProps: AdditionalProperty[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records.insert(additionalProperties).values(
    productProps.map((props) => {
      return {
        ...props,
        subjectOf: sku,
      };
    }),
  );
}

export async function insertDescriptions(
  productProps: Description[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records.insert(descriptions).values(
    productProps.map((props) => {
      return {
        ...props,
        subjectOf: sku,
      };
    }),
  );
}

export async function insertImages(
  productImages: ImageProduct[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records.insert(images).values(
    productImages.map((props) => {
      return {
        ...props,
        subjectOf: sku,
      };
    }),
  );
}

export async function insertVideos(
  productVideo: Video[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records.insert(videos).values(
    productVideo.map((props) => {
      return {
        ...props,
        subjectOf: sku,
      };
    }),
  );
}

export async function insertAvaliability(
  avaliablility: AvaliableIn[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records.insert(avaliableIn).values([
    ...avaliablility.map(({ domain }) => ({
      domain,
      subjectOf: sku,
    })),
    ...DEFAULT_DOMAINS.map((domain) => ({
      domain,
      subjectOf: sku,
    })),
  ]);
}

export async function insertProduct(
  {
    product,
    categories,
    additionalProperties,
    avaliableIn,
    descriptions,
    images,
    videos,
    measurements,
    documents,
    ctx,
  }: SubmitProductProps & { ctx: AppContext },
) {
  if (
    categories.length === 0 || additionalProperties.length === 0 ||
    images.length === 0 || measurements.length === 0
  ) {
    throw new Error("Invalid product data");
  }

  await insertBaseData(product, ctx);
  await insertCategories(categories, product.sku, ctx);
  await insertMeasurements(measurements, product.sku, ctx);
  await insertAdditionalProperties(additionalProperties, product.sku, ctx);
  await insertImages(images, product.sku, ctx);
  if (avaliableIn && avaliableIn.length > 0) {
    await insertAvaliability(avaliableIn, product.sku, ctx);
  }
  if (descriptions && descriptions.length > 0) {
    await insertDescriptions(descriptions, product.sku, ctx);
  }
  if (videos && videos.length > 0) {
    await insertVideos(videos, product.sku, ctx);
  }
  if (documents && documents.length > 0) {
    await insertDocuments(documents, product.sku, ctx);
  }
}

export async function updateBaseData(
  product: Partial<Product>,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  const updateData: Partial<Product> = {};
  Object.keys(product).forEach((key) => {
    const value = product[key as keyof Product];
    if (value) {
      updateData[key as keyof Product] = value;
    }
  });
  if (Object.keys(updateData).length > 0) {
    await records
      .update(products)
      .set(updateData)
      .where(eq(products.sku, product.sku!));
  }
}

export async function insertDocuments(
  documents: ProductDocument[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records.insert(productDocuments).values(
    documents.map((props) => {
      return {
        ...props,
        subjectOf: sku,
      };
    }),
  );
}

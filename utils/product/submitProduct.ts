import { AppContext } from "apps/records/mod.ts";
import {
  AdditionalProperty,
  AvaliableIn,
  ImageProduct,
  Product,
  ProductCategory,
  Video,
} from "../types.ts";
import {
  additionalProperties,
  avaliableIn,
  descriptions,
  images,
  productCategories,
  products,
  videos,
} from "../../db/schema.ts";
import { Props as SubmitProductProps } from "../../actions/product/submit.ts";
import { Description } from "../types.ts";
import { eq } from "drizzle-orm";

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
        additionalType: props.additionalType ? "BANNER" : "IMAGE",
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
  await records.insert(avaliableIn).values(
    avaliablility.map(({ site }) => {
      const avaliable = site.split("---");
      return {
        site: Number(avaliable[0]),
        subjectOf: sku,
      };
    }),
  );
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
    ctx,
  }: SubmitProductProps & { ctx: AppContext },
) {
  await insertBaseData(product, ctx);
  await insertCategories(categories, product.sku, ctx);
  await insertAdditionalProperties(additionalProperties, product.sku, ctx);
  await insertAvaliability(avaliableIn, product.sku, ctx);
  await insertDescriptions(descriptions, product.sku, ctx);
  await insertImages(images, product.sku, ctx);
  if (videos && videos.length > 0) {
    await insertVideos(videos, product.sku, ctx);
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

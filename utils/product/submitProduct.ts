import { AppContext } from "apps/records/mod.ts";
import {
  AdditionalProperty,
  AvaliableIn,
  ImageProduct,
  Measurements,
  Product,
  ProductCategory,
  ProductDocument,
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
import { Props as SubmitProductProps } from "../../actions/product/createProduct.ts";
import { Description } from "../types.ts";
import { and, eq } from "drizzle-orm";
import { DEFAULT_DOMAINS } from "./constants.ts";
import {
  isValidMeasurements,
  matchAvaliableBrandsLoaderPattern,
  matchAvaliableCategoriesLoaderPattern,
} from "../utils.ts";
import { Category as CategoryFromDatabase } from "./getProduct.ts";
import { LibSQLDatabase } from "apps/records/deps.ts";

export async function insertBaseData(product: Product, ctx: AppContext) {
  const records = await ctx.invoke.records.loaders.drizzle();
  const { brandId } = matchAvaliableBrandsLoaderPattern(product.brand) ?? {};
  await records.insert(products).values({
    ...product,
    brand: brandId ?? "",
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
      const { categoryId } = matchAvaliableCategoriesLoaderPattern(subjectOf) ??
        {};
      return {
        subjectOf: categoryId,
        product: sku,
      };
    }),
  );
}

export async function insertMeasurements(
  measurements: Measurements,
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records.insert(productMeasurements).values(
    Object.entries(measurements).map(([key, value]) => {
      return {
        ...value,
        subjectOf: sku,
        propertyID: key.toUpperCase(),
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
    images.length === 0 || !isValidMeasurements(measurements)
  ) {
    throw new Error("Invalid product data");
  }

  await insertBaseData(product, ctx);
  await insertMeasurements(measurements, product.sku, ctx);
  await insertCategories(categories, product.sku, ctx);
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

export async function overrideBaseData(
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

export async function overrideDocuments(
  documents: ProductDocument[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records
    .delete(productDocuments)
    .where(eq(productDocuments.subjectOf, sku));
  if (documents && documents.length > 0) {
    await insertDocuments(documents, sku, ctx);
  }
}

export async function overrideMeasurements(
  measurements: Partial<Measurements>,
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  const measurementsArray = Object.entries(measurements).map(([key, value]) => {
    return {
      ...value,
      subjectOf: sku,
      propertyID: key.toUpperCase(),
    };
  });
  const promises = measurementsArray.map((measurement) => {
    return records.update(productMeasurements).set(measurement).where(and(
      eq(productMeasurements.subjectOf, sku),
      eq(productMeasurements.propertyID, measurement.propertyID),
    ));
  });
  await Promise.all(promises);
}

export async function overrideAdditionalProperties(
  productProps: AdditionalProperty[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records.delete(additionalProperties).where(
    eq(additionalProperties.subjectOf, sku),
  );
  if (productProps && productProps.length > 0) {
    await insertAdditionalProperties(productProps, sku, ctx);
  }
}

export async function overrideCategories(
  categories: ProductCategory[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  await records.delete(productCategories).where(
    eq(productCategories.product, sku),
  );
  if (categories && categories.length > 0) {
    await insertCategories(categories, sku, ctx);
  }
}

export async function addCategories(
  categories: ProductCategory[],
  sku: string,
  ctx: AppContext,
) {
  const records = await ctx.invoke.records.loaders.drizzle();
  const productCategoriesFromRecords = await getProductCategories(sku, records);
  const categoriesToInsert = categories.filter((c) =>
    !productCategoriesFromRecords.find((productCat) =>
      productCat.subjectOf ===
        matchAvaliableCategoriesLoaderPattern(c.subjectOf)?.categoryId
    )
  );
  await insertCategories(categoriesToInsert, sku, ctx);
  return getProductCategories(sku, records);
}

const getProductCategories = async (
  sku: string,
  records: LibSQLDatabase<Record<string, never>>,
) =>
  await records
    .select()
    .from(productCategories)
    .where(eq(productCategories.product, sku)) as CategoryFromDatabase[];

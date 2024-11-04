import {
  AnySQLiteColumn,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const contact = sqliteTable("contact", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  country: text("country"),
  serialNumber: text("serialNumber"),
  subject: text("subject"),
  message: text("message"),
  personName: text("personName"),
  personSurname: text("personSurname"),
  personEmail: text("personEmail"),
  personPhone: text("personPhone"),
  date: text("date"),
  status: text("status"),
  originSite: text("originSite"),
});

//Define the avaliable domains to the product and his categories
export const domains = sqliteTable("domains", {
  identifier: text("identifier").primaryKey(), // P.K
  description: text("name").notNull(),
});

//Define the categories
export const categories = sqliteTable("categories", {
  identifier: text("identifier").primaryKey(),
  value: text("value").notNull(),
  description: text("description"),
  additionalType: text("additionalType").notNull(),
  subjectOf: text("subjectOf").references((): AnySQLiteColumn =>
    categories.identifier
  ),
});

//Define where the categories are avaliable
export const categoryAvaliableIn = sqliteTable("categoryAvaliableIn", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => categories.identifier), // F.K
  domain: text("domain").references(() => domains.identifier), // F.K
});

//Define categories of a product
export const productCategories = sqliteTable("productCategories", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => categories.identifier), // F.K
  product: text("product").references(() => products.sku), // F.K
});

//Define products
export const products = sqliteTable("products", {
  sku: text("sku").primaryKey(), // P.K
  name: text("name").notNull(),
  productID: text("productID").notNull().unique(),
  brand: text("brand").references(() => brands.identifier), // F.K
  description: text("description"),
  gtin: text("gtin"),
  releaseDate: text("releaseDate"),
});

//Define brands
export const brands = sqliteTable("brands", {
  identifier: text("identifier").primaryKey(), // P.K
  name: text("name").notNull(),
  description: text("description"),
  logo: text("logo"),
});

//Define product additionalProperties
export const additionalProperties = sqliteTable("additionalProperties", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => products.sku), // F.K
  propertyID: text("propertyID").notNull(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  unitCode: text("unitCode"),
  unitText: text("unitText"),
});

//Define product extra descriptions
export const descriptions = sqliteTable("descriptions", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => products.sku), // F.K
  name: text("name").notNull(),
  value: text("value").notNull(),
  image: text("image"),
});

//Define product images
export const images = sqliteTable("images", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => products.sku), // F.K
  url: text("url").notNull(),
  disambiguatingDescription: text("disambiguatingDescription"),
  additionalType: text("additionalType"),
  name: text("name"),
  description: text("description"),
});

//Define product videos
export const videos = sqliteTable("videos", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => products.sku), // F.K
  contentUrl: text("contentUrl").notNull(),
  thumbnailUrl: text("thumbnailUrl").notNull(),
  uploadDate: text("uploadDate"),
  duration: text("duration"),
});

//Define product avaliability
export const avaliableIn = sqliteTable("avaliableIn", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => products.sku), // F.K
  domain: text("domain").references(() => domains.identifier), // F.K
});

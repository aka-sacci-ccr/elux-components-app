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

export const categories = sqliteTable("categories", {
  identifier: text("identifier").primaryKey(),
  value: text("value").notNull(),
  description: text("description"),
  additionalType: text("additionalType").notNull(),
  subjectOf: text("subjectOf").references((): AnySQLiteColumn =>
    categories.identifier
  ),
});

export const productCategories = sqliteTable("productCategories", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => categories.identifier), // F.K
  product: text("product").references(() => products.sku), // F.K
});

export const products = sqliteTable("products", {
  sku: text("sku").primaryKey(), // P.K
  name: text("name").notNull(),
  productID: text("productID").notNull(),
  brand: text("brand").references(() => brands.identifier), // F.K
  description: text("description"),
  gtin: text("gtin"),
  releaseDate: text("releaseDate"),
});

export const brands = sqliteTable("brands", {
  identifier: text("identifier").primaryKey(), // P.K
  name: text("name").notNull(),
  description: text("description"),
  logo: text("logo"),
});

export const additionalProperties = sqliteTable("additionalProperties", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => products.sku), // F.K
  propertyID: text("propertyID").notNull(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  unitCode: text("unitCode"),
  unitText: text("unitText"),
});

export const descriptions = sqliteTable("descriptions", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => products.sku), // F.K
  name: text("name").notNull(),
  value: text("value").notNull(),
  image: text("image"),
});

export const images = sqliteTable("images", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => products.sku), // F.K
  url: text("url").notNull(),
  disambiguatingDescription: text("disambiguatingDescription"),
  additionalType: text("additionalType"),
  name: text("name"),
  description: text("description"),
});

export const videos = sqliteTable("videos", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => products.sku), // F.K
  contentUrl: text("contentUrl").notNull(),
  thumbnailUrl: text("thumbnailUrl").notNull(),
  uploadDate: text("uploadDate"),
  duration: text("duration"),
});

export const siteNames = sqliteTable("siteNames", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  name: text("name").notNull(),
});

export const avaliableIn = sqliteTable("avaliableIn", {
  identifier: integer("identifier").primaryKey({ autoIncrement: true }), // P.K
  subjectOf: text("subjectOf").references(() => products.sku), // F.K
  site: integer("site").references(() => siteNames.identifier), // F.K
});

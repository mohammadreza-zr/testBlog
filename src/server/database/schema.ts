import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

export type SelectUser = Omit<typeof usersTable.$inferSelect, "password">;

export const sessionsTable = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: integer("expires_at").notNull(),
});

export const titles = sqliteTable("titles", {
  id: integer("id").primaryKey(),
  rendered: text("rendered"),
});

export const contents = sqliteTable("contents", {
  id: integer("id").primaryKey(),
  rendered: text("rendered"),
  protected: integer("protected"), // Use 1 for true and 0 for false
});

export const excerpts = sqliteTable("excerpts", {
  id: integer("id").primaryKey(),
  rendered: text("rendered"),
  protected: integer("protected"), // Use 1 for true and 0 for false
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name"),
  slug: text("slug"),
});

export const featuredMedia = sqliteTable("featured_media", {
  id: integer("id").primaryKey(),
  title: text("title"),
  caption: text("caption"),
  description: text("description"),
  width: integer("width"),
  height: integer("height"),
  fileSize: integer("file_size"),
  sourceUrl: text("source_url"),
});

export const postsTable = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  date: text("date"),
  dateGmt: text("date_gmt"),
  modified: text("modified"),
  modifiedGmt: text("modified_gmt"),
  slug: text("slug"),
  status: text("status"),
  type: text("type"),
  titleId: integer("title_id").references(() => titles.id),
  contentId: integer("content_id").references(() => contents.id),
  excerptId: integer("excerpt_id").references(() => excerpts.id),
  categoryId: integer("category_id").references(() => categories.id),
  featuredMediaId: integer("featured_media_id").references(
    () => featuredMedia.id
  ),
});

export type InsertPost = typeof postsTable.$inferInsert;

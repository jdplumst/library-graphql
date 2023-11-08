import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const author = sqliteTable("author", {
    id: integer("id").primaryKey(),
    firstName: text("first_name"),
    lastName: text("last_name")
});
export const book = sqliteTable("book", {
    id: integer("id").primaryKey(),
    name: text("name"),
    genre: text("genre"),
    publishedDate: text("published_date").default(sql `CURRENT_DATE`),
    authorId: integer("author_id").references(() => author.id)
});

// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {index, uniqueIndex, pgTableCreator, primaryKey } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const combo = createTable("combo", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  carryId: d.integer("carry_id").notNull(),
  supportId: d.integer("support_id").notNull(),
  descId: d.integer("desc_id").references(() => description.id),
}),
(t) => [uniqueIndex("combo_idx").on(t.id)]
);

export const build = createTable("build", (d) => ({
  id: d.integer().generatedByDefaultAsIdentity(),
  championId: d.integer("champion_id").notNull(),
  runePageId: d.integer("rune_page_id").references(() => runes.id),
  summonerSpellD: d.integer("summoner_spell_d").notNull(),
  summonerSpellF: d.integer("summoner_spell_f").notNull(),
  skillOrder: d.varchar({ length: 50 }).notNull()
}),
(t) => [
  primaryKey({ columns: [t.id, t.championId] })
]);

export const runes = createTable("runes", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  primaryRuneId: d.integer("primary_rune_id").notNull(),
  secondaryRuneId: d.integer("secondary_rune_id").notNull(),
  keystoneRuneId: d.integer("keystone_rune_id").notNull(),
  primary: d.varchar({length: 100}).notNull(),
  secondary: d.varchar({length: 100}).notNull(),
}),
(t) => [uniqueIndex("runes_idx").on(t.id)]
);

export const inventory = createTable("inventory", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  buildId: d.integer("build_id").notNull(),
  bootsId: d.integer("boots_id").notNull(),
  items: d.jsonb("items").notNull()
}),
(t) => [index("inventory_idx").on(t.id)]
);

export const description = createTable("description", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  text: d.text().notNull(),
  language: d.varchar({length: 2}).notNull(),
}),
(t) => [index("description_idx").on(t.id, t.language)]
);



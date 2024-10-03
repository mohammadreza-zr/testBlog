import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/server/database/schema.ts",
  out: "./src/server/database/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  driver: "turso",
});

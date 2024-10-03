import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { usersTable } from "../../../../server/database/schema";

export const insertUserSchema = createInsertSchema(usersTable).omit({
  id: true,
});

export type InsertUserSchema = z.infer<typeof insertUserSchema>;

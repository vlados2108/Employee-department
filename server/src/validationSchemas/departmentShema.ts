import { z } from "zod";

export const departmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  created_at: z.date(),
});

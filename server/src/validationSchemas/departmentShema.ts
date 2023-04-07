import { z } from "zod"

export const departmentSchema = z.object({
    id: z.number(),
    foundation_date: z.date(),
    description: z.string(),
    name: z.string(),
    company: z.string(),
    salary: z.number(),
})
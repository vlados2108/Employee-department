import { z } from "zod"

export const employeeSchema = z.object({
    id: z.number(),
    name: z.string(),
    last_name: z.string(),
    position: z.string(),
    department: z.number(),
    salary: z.number(),
    is_leader: z.boolean(),
    created_at: z.date(),
    company: z.string()
})
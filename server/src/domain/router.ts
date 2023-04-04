import { bigint, z } from 'zod';

import { router, publicProcedure } from '../trps';

import { Prisma } from "../dbOperations"

const prisma = new Prisma();

export const employeeRouter = router({
    getEmployees: publicProcedure.query(() => {
        return prisma.getEmployeees();
    }),
    getEmployeeById: publicProcedure
        .input((val: unknown) => {
            if (typeof val === "number") return val;
            throw new Error(`Invalid input: ${typeof val}`);
        })
        .query((req) => {
            const { input } = req;
            const employee = prisma.getEployeeById(input);
            return employee;
        }),
    createEmployee: publicProcedure
        .input(z.object({
            id: z.number(),
            name: z.string(),
            last_name: z.string(),
            position: z.string(),
            department: z.number(),
            salary: z.number(),
            is_leader: z.boolean()
        }))
        .mutation((req) => {
            const { input } = req;
            prisma.createEmployee(input);
        })
})

export const departmentRouter = router({
    getDepartments: publicProcedure.query(() => {
        return prisma.getDepartments();
    }),
    getDepartmentById: publicProcedure
        .input((val: unknown) => {
            if (typeof val === "number") return val;
            throw new Error(`Invalid input: ${typeof val}`);
        })
        .query((req) => {
            const { input } = req;
            const department = prisma.getDepartmentById(input);
            return department;
        }),
    createDepartment: publicProcedure
        .input(z.object({
            id: z.number(),
            foundation_date: z.date(),
            description: z.string(),
            name: z.string(),
            company: z.string(),
            salary: z.number(),
        }))
        .mutation((req) => {
            const { input } = req;
            prisma.createDepartment(input);
        })
})
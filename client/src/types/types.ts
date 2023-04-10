import { SerializeObject } from "@trpc/server/shared";
import {departmentSchema} from "../../../server/src/validationSchemas/departmentShema"
import {employeeSchema} from "../../../server/src/validationSchemas/employeeSchema"
import {z} from "zod"
import {
  Department,
  Employee,
} from "../../../server/node_modules/.prisma/client";
import { trpc } from "../trpc";

const deps = trpc.departmentRouter.getDepartments.useQuery();
const empls = trpc.employeeRouter.getEmployees.useQuery();
const dep = trpc.departmentRouter.getDepartmentById.useQuery(1);
const empl = trpc.employeeRouter.getEmployeeById.useQuery(1);

export type Deps = typeof deps.data;
export type Empls = typeof empls.data;
export type Dep = typeof dep.data;
export type empl = typeof empl.data;
export type NewDepartment = z.infer<typeof departmentSchema>
export type NewEmployee = z.infer<typeof employeeSchema >
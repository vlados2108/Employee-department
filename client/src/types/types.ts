import { SerializeObject } from "@trpc/server/shared";
import { Department, Employee } from "../../../server/node_modules/.prisma/client"
import { trpc } from "../trpc";

const deps = trpc.departmentRouter.getDepartments.useQuery()
const empls = trpc.employeeRouter.getEmployees.useQuery()
const dep = trpc.departmentRouter.getDepartmentById.useQuery(1)
const empl = trpc.employeeRouter.getEmployeeById.useQuery(1)

export type Deps = typeof deps.data
export type Empls = typeof empls.data
export type Dep = typeof dep.data
export type empl = typeof empl.data
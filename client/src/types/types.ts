import { SerializeObject } from "@trpc/server/shared";
import { Department, Employee } from "../../../server/node_modules/.prisma/client"
import { trpc } from "../trpc";

const deps = trpc.departmentRouter.getDepartments.useQuery()
const empl = trpc.employeeRouter.getEmployees.useQuery()
export type UndefinedToOptional<T> = {
    [P in keyof T]?: T[P];
};

export interface DepartmentData {
    data: SerializeObject<UndefinedToOptional<Department>>[] | undefined;
}

export interface EmployeeData {
    data: SerializeObject<UndefinedToOptional<Employee>>[] | undefined;
}

export type Deps = typeof deps.data
export type Empl = typeof empl.data
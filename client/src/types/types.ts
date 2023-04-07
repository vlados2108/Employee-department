import { SerializeObject } from "@trpc/server/shared";
import { Department, Employee } from "../../../server/node_modules/.prisma/client"

export type UndefinedToOptional<T> = {
    [P in keyof T]?: T[P];
};

export interface DepartmentData {
    data: SerializeObject<UndefinedToOptional<Department>>[] | undefined;
}

import { z } from "zod";
import { departmentSchema } from "../validationSchemas/departmentShema";
import { numberSchema } from "../validationSchemas/numberSchema";
import { router, publicProcedure } from "../trps";

import { DepartmentService } from "../Services/DepartmentService";

const departmentService = new DepartmentService();

export const departmentRouter = router({
  getDepartments: publicProcedure.query(async () => {
    return await departmentService.getDepartments();
  }),
  getDepartmentById: publicProcedure.input(numberSchema).query((req) => {
    const { input } = req;
    const department = departmentService.getDepartmentById(input);
    return department;
  }),
  createDepartment: publicProcedure.input(departmentSchema).mutation((req) => {
    const { input } = req;
    departmentService.createDepartment(input);
  }),
  deleteDepartmentById: publicProcedure.input(numberSchema).mutation((req) => {
    const { input } = req;
    departmentService.deleteDepartmentById(input);
  }),
  getTopFiveDepartments: publicProcedure.query(() => {
    const topFiveDepartments = departmentService.getTopFiveDepartments();
    return topFiveDepartments;
  }),
  getLeaderOfDepartment: publicProcedure.input(numberSchema).query((req) => {
    const { input } = req;
    const leader = departmentService.getLeaderOfDepartment(input);
    return leader;
  }),
  getCountOfDepartments: publicProcedure.query(async ()=>{
    const count = await departmentService.getCountOfDepartments();
    return count
  }),
  getCountOfEmployeesInDepartment: publicProcedure
    .input(numberSchema)
    .query((req) => {
      const { input } = req;
      const count = departmentService.getCountOfEmployeesInDepartment(input);
      return count;
    }),
});

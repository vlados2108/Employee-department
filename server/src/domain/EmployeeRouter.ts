import { z } from "zod";
import { employeeSchema } from "../validationSchemas/employeeSchema";
import { numberSchema } from "../validationSchemas/numberSchema";
import { router, publicProcedure } from "../trps";

import { EmployeeService } from "../Services/EmployeeService";
import { resolve } from "path";

const employeeService = new EmployeeService();

export const employeeRouter = router({
  getEmployees: publicProcedure.query(() => {
    return employeeService.getEmployeees();
  }),
  getEmployeeById: publicProcedure.input(numberSchema).query((req) => {
    const { input } = req;
    const employee = employeeService.getEployeeById(input);
    return employee;
  }),
  getEmployeesInDepartment: publicProcedure.input(numberSchema).query((req) => {
    const { input } = req;
    const employeesInDep = employeeService.getEmployeesInDepartment(input);
    return employeesInDep;
  }),
  createEmployee: publicProcedure.input(employeeSchema).mutation((req) => {
    const { input } = req;
    employeeService.createEmployee(input);
  }),
  deleteEmployeeById: publicProcedure.input(numberSchema).mutation((req) => {
    const { input } = req;
    const employeesInDep = employeeService.deleteEmployeeById(input);
    return employeesInDep;
  }),
  getFiveLatestAddedEmployees: publicProcedure.query(() => {
    const fiveLatestAddedEmployees =
      employeeService.getFiveLatestAddedEmployees();
    return fiveLatestAddedEmployees;
  }),
});

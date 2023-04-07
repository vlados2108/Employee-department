import { router } from './trps';
import { employeeRouter } from './domain/EmployeeRouter';
import { departmentRouter } from './domain/DepartmentRouter';

export const appRouter = router({
    employeeRouter: employeeRouter,
    departmentRouter: departmentRouter
});

export type AppRouter = typeof appRouter;

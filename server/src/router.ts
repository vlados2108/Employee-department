import { router } from './trps';
import { employeeRouter, departmentRouter } from './domain/router';

export const appRouter = router({
    employeeRouter: employeeRouter,
    departmentRouter: departmentRouter
});

export type AppRouter = typeof appRouter;

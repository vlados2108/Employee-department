import * as React from 'react';
import { Deps, Empl } from "./types/types"
import { trpc } from './trpc';
import Menu from "./components/Menu"
import { Department, Employee } from "../../server/node_modules/.prisma/client"

const App = () => {
  const employees = trpc.employeeRouter.getEmployees.useQuery();
  const departments = trpc.departmentRouter.getDepartments.useQuery();

  if (employees.isLoading || departments.isLoading)
    return <div>Loading...</div>
  console.log(departments.data);
  console.log(employees.data);

  return (
    <>
      <Menu departments={departments.data} employees={employees.data} />
    </>

  )
};

export default App;
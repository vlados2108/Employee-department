import * as React from 'react';
import { DepartmentData } from "./types/types"
import { trpc } from './trpc';
import Menu from "./components/Menu"
import { Department, Employee } from "../../server/node_modules/.prisma/client"

const App = () => {
  const employees = trpc.employeeRouter.getEmployees.useQuery();
  const { data, isLoading } = trpc.departmentRouter.getDepartments.useQuery();
  console.log(employees);
  if (isLoading) return <div>Loading ...</div>;
  console.log(data);
  return (
    <>
      <Menu data={data} />
      {/* <div>
        <ul>
          {(data ?? []).map((employee) => (
            <li key={employee.id}>"{employee.name} {employee.last_name}"</li>
          ))}
        </ul>
      </div> */}
    </>

  )
};

export default App;
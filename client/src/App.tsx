import * as React from 'react';

import { trpc } from './trpc';
import Menu from "./components/Menu"
const App = () => {
  //const { data, isLoading } = trpc.employeeRouter.getEmployees.useQuery();

  //if (isLoading) return <div>Loading ...</div>;

  return (
    <Menu />
    // <div>
    //   <ul>
    //     {(data ?? []).map((employee) => (
    //       <li key={employee.id}>"{employee.name} {employee.last_name}"</li>
    //     ))}
    //   </ul>
    // </div>
  )
};

export default App;
import * as React from 'react';

import { trpc } from './trpc';

const App = () => {
  const { data, isLoading } = trpc.employeeRouter.getEmployees.useQuery();

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div>
      <ul>
        {(data ?? []).map((employee) => (
          <li key={employee.id}>"{employee.name} {employee.last_name}"</li>
        ))}
      </ul>
    </div>
  )
};

export default App;
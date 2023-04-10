import * as React from "react";
import { Deps, Empls } from "./types/types";
import { trpc } from "./trpc";
import Menu from "./components/Menu";
import { Department, Employee } from "../../server/node_modules/.prisma/client";

const App = () => {
  const deps = trpc.departmentRouter.getDepartments.useQuery();
  const empls =trpc.employeeRouter.getEmployees.useQuery();
  // const mut = trpc.departmentRouter.createDepartment.useMutation()
  // mut.mutate({id:8,name:"qqq",created_at:new Date(Date.now()),description:"sds"})
  console.log(deps);
  console.log(empls);
  if (deps.isLoading || empls.isLoading)
    return <div>Loading...</div>
  return (
    <>
      <Menu deps={deps.data} empls={empls.data}/>
    </>
  );
};

export default App;

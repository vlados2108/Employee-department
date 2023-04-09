import React, { useState } from "react";
import { trpc } from "../trpc";
function Employee(id: number) {
  const [employee, setEmployee] = useState(
    trpc.employeeRouter.getEmployeeById.useQuery(id).data
  );

  const getDepName = (id: number) => {
    const result =
      trpc.departmentRouter.getDepartmentById.useQuery(id).data?.name;
    if (result) return result;
    return "";
  };

  const reformateDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <div className="flex-container">
        <div className="wrapper employee">
          <div className="cell">Name</div>
          <div className="cell">Last name</div>
          <div className="cell">Position</div>
          <div className="cell">Department</div>
          <div className="cell">Salary</div>
          <div className="cell">Company</div>
          <div className="cell">Is leader</div>
          <div className="cell">Created At</div>
          <div className="cell">{employee?.name}</div>
          <div className="cell">{employee?.last_name}</div>
          <div className="cell">{employee?.position}</div>
          <div className="cell">{getDepName(employee!.department)}</div>
          <div className="cell">{employee?.salary}</div>
          <div className="cell">{employee?.company}</div>
          <div className="cell">{employee?.is_leader}</div>
          <div className="cell">{reformateDate(employee!.created_at)}</div>
        </div>
      </div>
    </>
  );
}

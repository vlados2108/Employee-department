import React, { useState, useEffect, useCallback } from "react";
import { trpc } from "../trpc";
import { Deps } from "../types/types";
import {
  Department,
  Employee,
} from "../../../server/node_modules/.prisma/client";

interface IDepartments {
  departments: Deps;
}

function Departments({ departments }: IDepartments) {
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 0;
  if (departments) {
    totalPages = Math.ceil((departments.length + 1) / rowsPerPage);
  }
  
  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const rowsToDisplay = departments?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const reformateDate = useCallback(
    (date: string) => {
      console.log(date);
      return new Date(date).toLocaleDateString();
    },
    [departments]
  );
  const getCountOfEmployees = (departmentId: number) => {
    return trpc.departmentRouter.getCountOfEmployeesInDepartment.useQuery(
      departmentId
    ).data;
  };
  const getLeaderOfDepartment = (departmentId: number) => {
    return trpc.departmentRouter.getLeaderOfDepartment.useQuery(departmentId)
      .data?.name;
  };

  //useMemo
  return (
    <>
      <div className="flex-container">
        <div className="wrapper">
          <div className="cell dark">#</div>
          <div className="cell dark">Name</div>
          <div className="cell dark">Count of employees</div>
          <div className="cell dark">Leader of department</div>
          <div className="cell dark">Date of foundation</div>
          {rowsToDisplay
            ? rowsToDisplay.map((department) => (
                <>
                  <div className="cell">{department.id}</div>
                  <div className="cell">{department.name}</div>
                  <div className="cell">
                    {getCountOfEmployees(department.id)}
                  </div>
                  <div className="cell">
                    {getLeaderOfDepartment(department.id)}
                  </div>
                  <div className="cell">
                    {reformateDate(department.created_at || "")}
                  </div>
                </>
              ))
            : ""}
        </div>
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handleClick(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Departments;

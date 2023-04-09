import React, { useCallback, useMemo, useState } from "react";
import { Empls } from "../types/types";
import { trpc } from "../trpc";
interface IEmployees {
  employees: Empls;
}
function Employees() {
  const [employees, setEmployees] = useState(
    trpc.employeeRouter.getEmployees.useQuery().data
  );
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 0;
  if (employees) {
    totalPages = Math.ceil((employees.length + 1) / rowsPerPage);
  }

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const rowsToDisplay = employees?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const reformateDate = useCallback(
    (date: string) => {
      console.log(date);
      return new Date(date).toLocaleDateString();
    },
    [employees]
  );
  const handleDeleteEmployee = (id: number) => {};
  return (
    <>
      <div className="flex-container">
        <div className="wrapper">
          <div className="cell dark">#</div>
          <div className="cell dark">Name</div>
          <div className="cell dark">Last name</div>
          <div className="cell dark">Company</div>
          <div className="cell dark">Date of adding</div>
          <div className="cell dark">Trash</div>
          {rowsToDisplay
            ? rowsToDisplay.map((employee) => (
                <>
                  <div className="cell">{employee.id}</div>
                  <div className="cell">{employee.name}</div>
                  <div className="cell">{employee.last_name}</div>
                  <div className="cell">{employee.company}</div>
                  <div className="cell">
                    {reformateDate(employee.created_at || "")}
                  </div>
                  <div className="cell">
                    <button onClick={() => handleDeleteEmployee(employee.id)}>
                      Delete
                    </button>
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

export default Employees;

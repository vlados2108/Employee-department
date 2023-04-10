import React, { useCallback, useMemo, useState } from "react";
import { Empls, NewEmployee } from "../types/types";
import { trpc } from "../trpc";
import CreateEmployee from "./CreateEmployee";
interface IEmployees {
  employees: Empls;
}

interface IProps {
  empls: Empls;
}
const Employees = (props: IProps) => {
  const [employees, setEmployees] = useState(props.empls);
  const deleteMutation = trpc.employeeRouter.deleteEmployeeById.useMutation();
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
      return new Date(date).toLocaleDateString();
    },
    [employees]
  );

  const handleAddEmployee = (newEmployee: NewEmployee) => {};
  const handleDeleteEmployee = (id: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (isConfirmed) deleteMutation.mutate(id);
  };
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
      <CreateEmployee onAdd={handleAddEmployee} />
    </>
  );
};

export default Employees;

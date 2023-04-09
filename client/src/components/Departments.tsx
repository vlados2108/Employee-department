import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "../trpc";
import { Deps, Dep, NewDepartment } from "../types/types";
import CreateDepartment from "./CreateDepartment";

const Departments = () => {
  const [departments, setDepartments] = useState(
    trpc.departmentRouter.getDepartments.useQuery().data
  );

  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 0;
  if (departments) {
    totalPages = Math.ceil((departments.length + 1) / rowsPerPage);
  }

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const rowsToDisplay =
    departments?.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    ) || [];

  const handleAddDepartment = (newDepartment: NewDepartment) => {
    const mutation = trpc.departmentRouter.createDepartment.useMutation();
    mutation.mutate(newDepartment);
  };

  const handleDeleteDepartment = async (id: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (isConfirmed) {
      const mutation =
        await trpc.departmentRouter.deleteDepartmentById.useMutation();
      mutation.mutate(id);
      // setDepartments((departments) =>
      //   departments?.filter((department) => {
      //     return department.id != id;
      //   })
      // );
    }
  };

  const reformateDate = useCallback(
    (date: string) => {
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
    const leader =
      trpc.departmentRouter.getLeaderOfDepartment.useQuery(departmentId).data;
    if (leader)
      return leader.name
    return ""
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
          <div className="cell dark">Trash</div>
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
                  <div className="cell">{reformateDate(department.created_at || "")}</div>
                  <div className="cell">
                    <button
                      onClick={() => handleDeleteDepartment(department.id)}
                    >
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
      <CreateDepartment onAdd={handleAddDepartment}/>
    </>
  );
};

export default Departments;


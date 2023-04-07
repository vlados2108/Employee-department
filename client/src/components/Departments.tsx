import React, { useState, useEffect } from "react"
import { trpc } from '../trpc';
import { DepartmentData } from "../types/types"
import { Department, Employee } from "../../../server/node_modules/.prisma/client"

interface IDepartments {
    departments: DepartmentData
}

function Departments(props: IDepartments) {
    //const [data, setDate] = useState(trpc.employeeRouter.getEmployees.useQuery())
    //const [data,isLoading] =  trpc.departmentRouter.getDepartments.useQuery();
    return (
        <>
            <div className="flex-container">
                <div className="wrapper">
                    <div className="cell">#</div>
                    <div className="cell">name</div>
                    <div className="cell">count of employees</div>
                    <div className="cell">leader of department</div>
                    <div className="cell">date of foundation</div>
                    {(props.departments.data ?? []).map((department) => (
                        <>
                            <div className="cell">{department.id}</div>
                            <div className="cell">{department.name}</div>
                            <div className="cell">2</div>
                            <div className="cell">leader</div>
                            <div className="cell">{department.created_at}</div>
                        </>
                    ))}

                </div>
            </div>

        </>
    )
}

export default Departments;
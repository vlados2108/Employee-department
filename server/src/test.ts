import { DepartmentService } from "./Services/DepartmentService";

const departmentService = new DepartmentService();

const a = async () => {
  const result = await departmentService.createDepartment({id:7,name:"crime",description:"desc crime",created_at:new Date(Date.now())});
  console.log(result);
};

a();

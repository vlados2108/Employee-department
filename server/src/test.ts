import { Prisma } from "./dbOperations"

const prisma = new Prisma()
const result = prisma.getCountOfEmployeesInDepartment(1);

result.then(function (res) {
    console.log(res);
})
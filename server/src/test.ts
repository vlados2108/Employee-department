import { Prisma } from "./dbOperations"

const prisma = new Prisma()

const a = async () => {
    const result = await prisma.getTopFiveDepartments();
    console.log(result);
}

a();
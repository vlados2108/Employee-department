import { Department, Employee, PrismaClient } from '@prisma/client'



export class Prisma {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /*Emloyee operations*/
  async getEmployeees() {
    const allEmployees = await this.prisma.employee.findMany()
      .catch(async (e) => this.handleError(e))
    return allEmployees
  }

  async getEployeeById(id: bigint) {
    const Employee = await this.prisma.employee.findUnique({
      where: { id: id }
    }).catch(async (e) => this.handleError(e))
    return Employee
  }

  async createEmployee(data: Employee) {
    const eployee = await this.prisma.employee.create({ data })
      .catch(async (e) => this.handleError(e));
  }

  /*Department operations*/
  async getDepartments() {
    const allDepartnents = await this.prisma.department.findMany()
      .catch(async (e) => this.handleError(e))
    return allDepartnents
  }

  async getDepartmentById(id: bigint) {
    const Department = await this.prisma.department.findUnique({
      where: { id: id }
    }).catch(async (e) => this.handleError(e))
    return Department
  }

  async createDepartment(data: Department) {
    const eployee = await this.prisma.department.create({ data })
      .catch(async (e) => this.handleError(e));
  }


  /*Close db connection*/
  async disconnect() {
    await this.prisma.$disconnect().catch(async (e) => this.handleError(e))
  }

  /*Handling errors*/
  async handleError(e: Error) {
    console.error(e)
    await this.prisma.$disconnect()
    process.exit(1)
  }

}





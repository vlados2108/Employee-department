import { Department, Employee, PrismaClient } from '@prisma/client'
import { number } from 'zod';



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

  async getEployeeById(id: number) {
    const Employee = await this.prisma.employee.findUnique({
      where: { id: id }
    }).catch(async (e) => this.handleError(e))
    return Employee
  }

  async getEmployeesInDepartment(depId: number) {
    const employeesInDep = await this.prisma.employee.findMany({
      where: {
        department: depId
      }
    }).catch(async (e) => this.handleError(e));
    return employeesInDep;
  }

  async createEmployee(data: Employee) {
    const eployee = await this.prisma.employee.create({ data })
      .catch(async (e) => this.handleError(e));
  }

  async deleteEmployeeById(id: number) {

  }

  async getFiveLatestAddedEmployees() {
    await this.prisma.employee.findMany({
      where:
      {

      }
    })
  }

  /*Department operations*/
  async getDepartments() {
    const allDepartnents = await this.prisma.department.findMany()
      .catch(async (e) => this.handleError(e))
    return allDepartnents
  }

  async getDepartmentById(id: number) {
    const Department = await this.prisma.department.findUnique({
      where: { id: id }
    }).catch(async (e) => this.handleError(e))
    return Department
  }

  async createDepartment(data: Department) {
    const eployee = await this.prisma.department.create({ data })
      .catch(async (e) => this.handleError(e));
  }

  async deleteDepartmentById(id: number) {

  }

  async getTopFiveDepartments() {
    const departmnets = await this.prisma.department.findMany()
      .catch(async (e) => this.handleError(e))

    let countMap = new Map<number, number>();
    let countArr: Array<[number, number]> = [];
    if (departmnets) {
      departmnets.forEach(async (dep) => {
        const employeesInDep = await this.prisma.employee.findMany({
          where: {
            department: dep.id
          }
        }).catch(async (e) => this.handleError(e));

        if (employeesInDep) {
          countMap.set(dep.id, employeesInDep.length + 1);
          //await countArr.push([dep.id, employeesInDep.length])
        }
      })
    }

    for (let value of countMap.values()) {
      console.log(value);
    }
    //console.log(countMap);
    countArr.sort((a, b) => {
      return a[1] - b[1];
    })

    return countArr;

  }

  async getLeaderOfDepartment(depId: number) {
    const leaderOfDep = await this.prisma.employee.findMany({
      where: {
        department: depId,
        is_leader: true
      }
    }).catch(async (e) => this.handleError(e));
    return leaderOfDep;
  }

  async getCountOfEmployeesInDepartment(depId: number) {
    // const employeesInDep = await this.prisma.employee.findMany({
    //   where: {
    //     department: depId
    //   }
    // }).catch(async (e) => this.handleError(e));
    const employeesInDep = this.getEmployeesInDepartment(depId).then

    if (employeesInDep)
      return employeesInDep.length + 1;
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





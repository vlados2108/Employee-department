import { Department, Employee, PrismaClient } from '@prisma/client'

type topFiveDep = Record<number, number>

export class Prisma {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      rejectOnNotFound: {
        findFirst: {
          Employee: (err) => new Error('Cant find employee'),
          Department: (err) => new Error('Cant find department')
        },
        findUnique: {
          Employee: (err) => new Error('Cant find employee'),
          Department: (err) => new Error('Cant find department')
        }
      }
    });
  }

  /*Emloyee operations*/
  async getEmployeees() {
    const allEmployees = await this.prisma.employee.findMany()
      .catch((e) => this.handleError(e))
    return allEmployees
  }

  async getEployeeById(id: number) {
    const Employee = await this.prisma.employee.findUnique({
      where: { id: id }
    }).catch((e) => this.handleError(e))
    return Employee
  }

  async getEmployeesInDepartment(depId: number) {
    const employeesInDep = await this.prisma.employee.findMany({
      where: {
        department: depId
      }
    }).catch((e) => this.handleError(e));
    return employeesInDep;
  }

  async createEmployee(data: Employee) {
    const eployee = await this.prisma.employee.create({ data })
      .catch((e) => this.handleError(e));
  }

  async deleteEmployeeById(id: number) {
    await this.prisma.employee.delete({
      where: {
        id: id
      }
    })
  }

  async getFiveLatestAddedEmployees() {
    const countOfRecords = await this.prisma.employee.count();
    const fiveLastAddedEmployees = await this.prisma.employee.findMany({
      where:
      {
        id: {
          gte: countOfRecords - 5,
          lte: countOfRecords,
        }
      }
    })
      .catch((e) => this.handleError(e))
    return fiveLastAddedEmployees
  }

  /*Department operations*/
  async getDepartments() {
    const allDepartnents = await this.prisma.department.findMany()
      .catch((e) => this.handleError(e))
    return allDepartnents
  }

  async getDepartmentById(id: number) {
    const Department = await this.prisma.department.findUnique({
      where: { id: id }
    })
      .catch((e) => this.handleError(e))
    return Department
  }

  async createDepartment(data: Department) {
    const eployee = await this.prisma.department.create({ data })
      .catch((e) => this.handleError(e));
  }

  async deleteDepartmentById(id: number) {
    await this.prisma.department.delete({
      where: {
        id: id
      }
    })
      .catch((e) => this.handleError(e));
  }


  async getTopFiveDepartments() {
    const departments = await this.prisma.department.findMany()
      .catch((e) => this.handleError(e))

    const countMap: Record<number, number> = {};
    if (departments) {
      for (const dep of departments) {
        const employeesCount = await this.prisma.employee.count({
          where: {
            department: dep.id
          }
        }).catch((e) => this.handleError(e));
        if (employeesCount) {
          countMap[dep.id] = employeesCount;
        }
      }
    }
    console.log(countMap);
    return countMap;

  }

  async getLeaderOfDepartment(depId: number) {
    const leaderOfDep = await this.prisma.employee.findMany({
      where: {
        department: depId,
        is_leader: true
      }
    }).catch((e) => this.handleError(e));
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
    await this.prisma.$disconnect()
      .catch((e) => this.handleError(e))
  }

  /*Handling errors*/
  async handleError(e: Error) {
    console.error(e)
    await this.prisma.$disconnect()
    process.exit(1)
  }

}





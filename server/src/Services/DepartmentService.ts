import { Department, Employee, PrismaClient } from "@prisma/client";

export class DepartmentService {
  private readonly prisma;

  constructor() {
    this.prisma = new PrismaClient({
      rejectOnNotFound: {
        findFirst: {
          Department: (err) => new Error("Cant find department"),
        },
        findUnique: {
          Department: (err) => new Error("Cant find department"),
        },
      },
    });
  }

  async getDepartments() {
    const allDepartnents = await this.prisma.department
      .findMany()
      .catch((e) => this.handleError(e));
    return allDepartnents;
  }

  async getDepartmentById(id: number) {
    const Department = await this.prisma.department
      .findUnique({
        where: { id: id },
      })
      .catch((e) => this.handleError(e));
    return Department;
  }

  async getCountOfDepartments() {
    const count = await this.prisma.department.count();
    return count;
  }
  async getEmployeesInDepartment(depId: number) {
    const employeesInDep = await this.prisma.employee
      .findMany({
        where: {
          department: depId,
        },
      })
      .catch((e) => this.handleError(e));
    return employeesInDep;
  }

  async createDepartment(data: Department) {
    const result = await this.prisma.department
      .create({ data })
      .catch((e) => this.handleError(e));
    return result;
  }

  async deleteDepartmentById(id: number) {
    await this.prisma.employee.updateMany({
      where:{
        department:id
      },
      data:{
        department:null
      }
    })
    await this.prisma.department
      .delete({
        where: {
          id: id,
        },
      })
      .catch((e) => this.handleError(e));
  }

  async getTopFiveDepartments() {
    const departments = await this.prisma.department
      .findMany()
      .catch((e) => this.handleError(e));

    const countMap: Record<number, number> = {};
    if (departments) {
      for (const dep of departments) {
        const employeesCount = await this.prisma.employee
          .count({
            where: {
              department: dep.id,
            },
          })
          .catch((e) => this.handleError(e));
        if (employeesCount) {
          countMap[dep.id] = employeesCount;
        }
      }
    }
    console.log(countMap);
    return countMap;
  }

  async getLeaderOfDepartment(depId: number) {
    const leaderOfDep = await this.prisma.employee
      .findFirst({
        where: {
          department: depId,
          is_leader: true,
        },
      })
      .catch((e) => this.handleError(e));
    if (leaderOfDep)
      return leaderOfDep
    console.log(`there is no such leader in department with id: ${depId}`)
  }

  async getCountOfEmployeesInDepartment(depId: number) {
    const count = await this.prisma.employee.count({
      where: {
        department: depId,
      },
    });
    return count;
  }

  /*Close db connection*/
  async disconnect() {
    await this.prisma.$disconnect().catch((e) => this.handleError(e));
  }

  /*Handling errors*/
  async handleError(e: Error) {
    console.error(e);
    await this.prisma.$disconnect();
    process.exit(1);
  }
}

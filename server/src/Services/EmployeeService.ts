import { Department, Employee, PrismaClient } from '@prisma/client'

export class EmployeeService {
    private readonly prisma;

    constructor() {
        this.prisma = new PrismaClient({
            rejectOnNotFound: {
                findFirst: {
                    Department: (err) => new Error('Cant find department')
                },
                findUnique: {
                    Department: (err) => new Error('Cant find department')
                }
            }
        });
    }

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
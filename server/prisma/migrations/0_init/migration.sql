-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT DEFAULT '""',
    "last_name" TEXT DEFAULT '""',
    "position" TEXT,
    "department" INTEGER,
    "salary" INTEGER,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "foundation_date" DATE,
    "description" TEXT,
    "name" TEXT,
    "company" TEXT,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_department_fkey" FOREIGN KEY ("department") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;


-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('EDUCATION', 'JOB_REQUEST');

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" TEXT NOT NULL,
    "type" "ContactType" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "message" TEXT NOT NULL,
    "educationId" TEXT,
    "company" TEXT,
    "domain" TEXT,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_submissions_type_createdAt_idx" ON "contact_submissions"("type", "createdAt");

-- CreateIndex
CREATE INDEX "contact_submissions_firstName_idx" ON "contact_submissions"("firstName");

-- CreateIndex
CREATE INDEX "contact_submissions_lastName_idx" ON "contact_submissions"("lastName");

-- CreateIndex
CREATE INDEX "contact_submissions_phone_idx" ON "contact_submissions"("phone");

-- AddForeignKey
ALTER TABLE "contact_submissions" ADD CONSTRAINT "contact_submissions_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "educations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

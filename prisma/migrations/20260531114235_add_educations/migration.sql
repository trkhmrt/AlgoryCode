-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL_LEVELS');

-- CreateEnum
CREATE TYPE "EducationFormat" AS ENUM ('ONLINE', 'IN_PERSON', 'HYBRID', 'LIVE', 'RECORDED');

-- CreateEnum
CREATE TYPE "EducationStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "instructorName" TEXT NOT NULL,
    "instructorTitle" TEXT,
    "instructorBio" TEXT,
    "instructorAvatarUrl" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "durationWeeks" INTEGER,
    "durationHours" INTEGER,
    "schedule" TEXT,
    "level" "EducationLevel" NOT NULL DEFAULT 'ALL_LEVELS',
    "format" "EducationFormat" NOT NULL DEFAULT 'ONLINE',
    "language" TEXT NOT NULL DEFAULT 'tr',
    "price" DECIMAL(10,2),
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "maxStudents" INTEGER,
    "location" TEXT,
    "prerequisites" TEXT,
    "learningOutcomes" TEXT[],
    "syllabus" TEXT,
    "coverImageUrl" TEXT,
    "status" "EducationStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "educations_slug_key" ON "educations"("slug");

-- CreateIndex
CREATE INDEX "educations_status_startDate_idx" ON "educations"("status", "startDate");

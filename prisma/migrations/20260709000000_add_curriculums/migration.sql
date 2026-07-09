-- CreateTable
CREATE TABLE "curriculums" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "curriculums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum_details" (
    "id" TEXT NOT NULL,
    "curriculumId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "totalDuration" TEXT,
    "lessons" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "curriculum_details_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "educations" ADD COLUMN "curriculumId" TEXT;

-- CreateIndex
CREATE INDEX "curriculum_details_curriculumId_sortOrder_idx" ON "curriculum_details"("curriculumId", "sortOrder");

-- CreateIndex
CREATE INDEX "educations_curriculumId_idx" ON "educations"("curriculumId");

-- AddForeignKey
ALTER TABLE "curriculum_details" ADD CONSTRAINT "curriculum_details_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "curriculums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "curriculums"("id") ON DELETE SET NULL ON UPDATE CASCADE;

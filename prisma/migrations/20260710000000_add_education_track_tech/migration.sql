-- CreateEnum
CREATE TYPE "EducationTrack" AS ENUM ('FRONTEND', 'BACKEND', 'DEVOPS', 'DATABASE', 'MOBILE', 'AI', 'FULLSTACK');

-- AlterTable
ALTER TABLE "educations" ADD COLUMN "track" "EducationTrack",
ADD COLUMN "techLanguage" TEXT;

-- CreateIndex
CREATE INDEX "educations_track_idx" ON "educations"("track");

-- CreateIndex
CREATE INDEX "educations_techLanguage_idx" ON "educations"("techLanguage");

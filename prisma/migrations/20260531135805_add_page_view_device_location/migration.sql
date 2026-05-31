-- AlterTable
ALTER TABLE "page_views" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "deviceType" TEXT,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "userAgent" TEXT;

-- CreateIndex
CREATE INDEX "page_views_country_createdAt_idx" ON "page_views"("country", "createdAt");

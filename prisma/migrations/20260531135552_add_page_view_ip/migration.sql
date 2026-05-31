-- AlterTable
ALTER TABLE "page_views" ADD COLUMN     "ipAddress" TEXT;

-- CreateIndex
CREATE INDEX "page_views_ipAddress_createdAt_idx" ON "page_views"("ipAddress", "createdAt");

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('IYZICO', 'FREE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "educationId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "provider" "PaymentProvider" NOT NULL DEFAULT 'IYZICO',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "iyzicoPaymentId" TEXT,
    "iyzicoPaymentTransactionId" TEXT,
    "buyerName" TEXT NOT NULL,
    "buyerSurname" TEXT NOT NULL,
    "buyerEmail" TEXT NOT NULL,
    "buyerPhone" TEXT,
    "buyerIdentityNumber" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "paidPrice" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "installment" INTEGER NOT NULL DEFAULT 1,
    "installmentRate" DECIMAL(5,2),
    "installmentAmount" DECIMAL(10,2),
    "binNumber" TEXT,
    "lastFourDigits" TEXT,
    "cardFamily" TEXT,
    "cardAssociation" TEXT,
    "cardBankName" TEXT,
    "cardType" TEXT,
    "failureCode" TEXT,
    "failureMessage" TEXT,
    "isLimitError" BOOLEAN NOT NULL DEFAULT false,
    "iyzicoRawResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_conversationId_key" ON "payments"("conversationId");

-- CreateIndex
CREATE INDEX "payments_educationId_createdAt_idx" ON "payments"("educationId", "createdAt");

-- CreateIndex
CREATE INDEX "payments_status_createdAt_idx" ON "payments"("status", "createdAt");

-- CreateIndex
CREATE INDEX "payments_buyerEmail_idx" ON "payments"("buyerEmail");

-- CreateIndex
CREATE INDEX "payments_installment_idx" ON "payments"("installment");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "educations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

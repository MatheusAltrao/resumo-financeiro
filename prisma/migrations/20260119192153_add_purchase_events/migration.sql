-- CreateTable
CREATE TABLE "PurchaseEvent" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT,
    "customerId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "creditsAdded" INTEGER NOT NULL,
    "paymentMethod" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "billingId" TEXT,
    "transactionId" TEXT,
    "rawEventData" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseEvent_eventId_key" ON "PurchaseEvent"("eventId");

-- CreateIndex
CREATE INDEX "PurchaseEvent_customerId_idx" ON "PurchaseEvent"("customerId");

-- CreateIndex
CREATE INDEX "PurchaseEvent_userId_idx" ON "PurchaseEvent"("userId");

-- CreateIndex
CREATE INDEX "PurchaseEvent_eventId_idx" ON "PurchaseEvent"("eventId");

-- CreateIndex
CREATE INDEX "PurchaseEvent_status_idx" ON "PurchaseEvent"("status");

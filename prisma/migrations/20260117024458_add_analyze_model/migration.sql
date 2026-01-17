-- CreateTable
CREATE TABLE "Analyze" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resumeData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analyze_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Analyze_userId_idx" ON "Analyze"("userId");

-- AddForeignKey
ALTER TABLE "Analyze" ADD CONSTRAINT "Analyze_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

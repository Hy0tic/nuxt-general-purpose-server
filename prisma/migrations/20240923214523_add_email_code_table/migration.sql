-- CreateTable
CREATE TABLE "EmailCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailCode_userId_key" ON "EmailCode"("userId");

-- AddForeignKey
ALTER TABLE "EmailCode" ADD CONSTRAINT "EmailCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

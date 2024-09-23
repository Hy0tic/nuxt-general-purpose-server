-- CreateTable
CREATE TABLE "TempToken" (
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TempToken_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "TempToken" ADD CONSTRAINT "TempToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

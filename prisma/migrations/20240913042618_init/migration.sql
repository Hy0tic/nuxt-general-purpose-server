-- CreateTable
CREATE TABLE "Photo" (
    "Id" SERIAL NOT NULL,
    "FileKey" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "UploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("Id")
);

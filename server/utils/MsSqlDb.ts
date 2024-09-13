import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const InsertPhotoIntoDb = async (R2Url: string, Title: string, Description:string) => {
    await prisma.photo.create({
        data:{
            Url: R2Url,
            Title: Title,
            Description: Description,
            UploadDate: new Date()
        },
    })
}
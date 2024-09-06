import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const upload = async () => {
    const res = await prisma.photo.create({
        data:{
            Url: "test",
            Title: "test",
            Description: "test",
            UploadDate: new Date()
        },
    })
}
import { PrismaClient } from "@prisma/client";
import { Photo } from "@prisma/client";

export const prisma = new PrismaClient();

export const InsertPhotoIntoDb = async (
    FileKey: string,
    Title: string,
    Description: string,
    maxRetries: number = 3, // maximum number of retries
    delayMs: number = 1000  // initial delay in milliseconds
  ) => {
    let attempts = 0;
  
    while (attempts < maxRetries) {
      try {
        await prisma.photo.create({
          data: {
            FileKey: FileKey,
            Title: Title,
            Description: Description,
            UploadDate: new Date(),
          },
        });

        break; // Exit loop on success
      } catch (error: any) {
        attempts++;
        console.error(`Attempt ${attempts} failed: ${error.message}`);
  
        if (attempts >= maxRetries) {
          console.error('Max retries reached. Insertion failed.');
          throw error; // Rethrow the error after max retries
        }
  
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempts)); // Exponential backoff
      }
    }
  };
  

export async function FetchRandomPhoto(): Promise<Photo> {
  // Fetch a random photo
  const result = await prisma.$queryRaw<Photo[]>`
    SELECT * 
    FROM "Photo"
    ORDER BY RANDOM()
    LIMIT 1;
  `;

  // Return the first item from the result array or null if no items are found
  return result[0];
}
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        console.log('Photo inserted successfully');
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
  
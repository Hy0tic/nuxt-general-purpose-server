
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3"

export const s3Client = new S3Client({
    region: 'auto', // Cloudflare R2 uses 'auto' as region
    endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY || '',
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY || '',
    },
  });

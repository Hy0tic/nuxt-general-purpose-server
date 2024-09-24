import { S3Client } from "@aws-sdk/client-s3";

export const CloudflareAccountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
export const BucketName = process.env.CLOUDFLARE_R2_BUCKET;
export const BucketDomain = process.env.CLOUFLARE_BUCKET_DOMAIN;

export const s3Client = new S3Client({
  region: "auto", // Cloudflare R2 uses 'auto' as region
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY || "",
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY || "",
  },
});

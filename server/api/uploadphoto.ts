// File: server/api/upload.ts
import { defineEventHandler } from 'h3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import { s3Client } from "../utils/R2";
import mime from "mime-types";
import * as fs from 'fs'; // Importing fs module to handle file streams
import * as path from "path";


export default defineEventHandler(async (event) => {
	// Create a new formidable form instance
	const form = formidable({
	  multiples: false,
	  keepExtensions: true,
	  maxFileSize: 50 * 1024 * 1024, // Set max file size (e.g., 50MB)
	});
  
	try {
	  // Parse the incoming form data
	  const { files } = await new Promise<{ files: formidable.Files }>((resolve, reject) => {
		form.parse(event.req, (err: any, fields: any, files: any) => {
		  if (err) reject(err);
		  else resolve({ files });
		});
	  });
  
	  // Extract the uploaded file
	  const file = files.file;
	  if (!file) {
		throw new Error('File not found in the uploaded data.');
	  }
  
	  // Check if filepath exists and is a string
	  const filepath = file[0].filepath;

	  if (typeof filepath !== 'string' || !fs.existsSync(filepath)) {
		throw new Error(`File path is invalid or does not exist: ${filepath}`);
	  }
  
	  // Stream the file directly to the R2 bucket
	  const fileStream = fs.createReadStream(filepath); // Read from the validated filepath
	  const mimeType = mime.contentType(path.extname(filepath)) || "application/octet-stream";

	  // Upload the file to R2
	  const uploadParams = {
		Bucket: process.env.CLOUDFLARE_R2_BUCKET || '',
		Key: file.originalFilename || 'uploaded-file', // Provide a default fallback key name
		Body: fileStream,
		ContentType: mimeType
	  };
  
	  // Execute the upload
	  const uploadResult = await s3Client.send(new PutObjectCommand(uploadParams));
	  return { message: 'Upload successful', data: uploadResult };
	} catch (error) {
	  console.error('Error uploading to R2:', error);
	  throw new Error(`Upload failed: ${error.message}`);
	}
  });
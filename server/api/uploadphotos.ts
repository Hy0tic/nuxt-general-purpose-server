// File: server/api/uploadphotos.ts
import { defineEventHandler } from "h3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import { s3Client } from "../utils/R2";
import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs"; // Importing fs module to handle file streams
import * as path from "path";
import { InsertPhotoIntoDb } from "../utils/PostgresSqlDb";

export default defineEventHandler(async (event) => {
	if (!event.context.session) {
		throw createError({
			message: "Unauthorized",
			statusCode: 401
		});
	}

	// Create a new formidable form instance
	const form = formidable({
		multiples: true,
		keepExtensions: true,
		maxFileSize: 50 * 1024 * 1024 * 2 // Set max file size (e.g., 50MB)
	});

	try {
		// Parse the incoming form data
		const { files } = await new Promise<{
			files: formidable.Files;
		}>((resolve, reject) => {
			form.parse(event.req, (err: any, fields: any, files: any) => {
				if (err) reject(err);
				else resolve({ files });
			});
		});

		console.log("FILES: ", files.files?.length);
		// Extract the uploaded file
		const file = files.files;
		if (!files.files) {
			throw new Error("File not found in the uploaded data.");
		}

		file?.forEach(async (f) => {
			// Extract title and description from fields
			const title = `Untitled #${generateRandomId()}`;
			const description = "";

			// Check if filepath exists and is a string
			const filepath = f.filepath;
			if (typeof filepath !== "string" || !fs.existsSync(filepath)) {
				throw new Error(`File path is invalid or does not exist: ${filepath}`);
			}

			// Stream the file directly to the R2 bucket
			const fileStream = fs.createReadStream(filepath); // Read from the validated filepath
			const mimeType =
				mime.contentType(path.extname(filepath)) || "application/octet-stream";

			const generatedFileKey = uuidv4();

			// Upload the file to R2
			const uploadParams = {
				Bucket: process.env.CLOUDFLARE_R2_BUCKET || "",
				Key: generatedFileKey, // Provide a default fallback key name
				Body: fileStream,
				ContentType: mimeType,
				Metadata: {
					title, // Store title as metadata (if supported)
					description // Store description as metadata (if supported)
				}
			};

			// Execute the upload
			// const uploadResult =
			await s3Client.send(new PutObjectCommand(uploadParams));

			InsertPhotoIntoDb(generatedFileKey, title, description);
		});

		return {
			statusCode: 200,
			message: "Upload successful"
			// data: uploadResult
		};
	} catch (error: any) {
		console.error("Error uploading to R2:", error);
		throw new Error(`Upload failed: ${error.message}`);
	}
});

function generateRandomId() {
	return Math.floor(Math.random() * 1e9); // Generates a random number up to 9 digits
}

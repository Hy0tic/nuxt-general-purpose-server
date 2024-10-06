// server/api/buildinfo.js
import { defineEventHandler } from "h3";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
	const filePath = path.join(process.cwd(), "buildinfo.json");

	try {
		const data = fs.readFileSync(filePath, "utf-8");
		const jsonData = JSON.parse(data);
		return jsonData;
	} catch (error) {
		return { error: "Could not read build info." };
	}
});

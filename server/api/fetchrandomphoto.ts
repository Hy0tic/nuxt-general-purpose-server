import { defineEventHandler } from "h3";
import { FetchRandomPhoto } from "../utils/PostgresSqlDb";
import { Photo } from "@prisma/client";
import ConstructR2Url from "../utils/UrlConstruct";

export default defineEventHandler(async (event) => {
	const res: Photo = await FetchRandomPhoto();

	return {
		message: "random photo here",
		result: ConstructR2Url(res.FileKey),
		status: "success"
	};
});

import { upload } from "../utils/MsSqlDb"

export default defineEventHandler(async (event) => {
	upload();
	return {
		result: "upload photo",
	}
})
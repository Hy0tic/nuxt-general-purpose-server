
export default defineEventHandler(async (event) => {

	return {
		message: "uploaded video",
		result: "video uploaded",
		status: 'success',
	}
})
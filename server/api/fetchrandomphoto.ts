import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
	return {
		message: "random photo here",
		result: "random photo",
		status: 'success',
	}
})
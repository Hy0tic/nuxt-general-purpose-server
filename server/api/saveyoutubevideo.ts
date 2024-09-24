export default defineEventHandler(async (event) => {
  if (!event.context.session) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }

  return {
    message: "uploaded video",
    result: "video uploaded",
    status: "success",
  };
});

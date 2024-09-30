import ConstructR2Url from "../utils/UrlConstruct";

export default defineEventHandler(async (event) => {
	if (!event.context.session) {
		throw createError({
			message: "Unauthorized",
			statusCode: 401
		});
	}

	const query = getQuery(event);
	const pageNumber = query.pageNumber ?? 0;
	const imageCountPerPage = Number(query.imageCountPerPage) ?? 30;
	const offset = Number(pageNumber) * Number(imageCountPerPage);
	// console.log("NUMBER: ", query.pageNumber)

	// //const query = "select * from \"Photo\" p order by \"UploadDate\" desc limit 1 offset 0";

	const queryResult: any = await prisma.$queryRaw`
			select * from "Photo" p
			order by "UploadDate" desc 
			limit ${imageCountPerPage} offset ${offset}
		`; // note: to go to next page, you have to add amount of items on a page to offset, eg: if page limit is 25, add 25 to offset to go to next page.

	// console.log(queryResult)

	const totalImageCount = await prisma.photo.count();

	// Mapping the array to the ImageInfo type
	const imageInfoArray: ImageInfo[] = queryResult.map(
		(photo: {
			Id: string;
			UploadDate: any;
			Title: any;
			Description: any;
			FileKey: any;
		}) => ({
			title: photo.Title,
			description: photo.Description,
			url: ConstructR2Url(photo.FileKey) // Constructing URL using the FileKey
		})
	);

	// get page number as parameter

	return {
		statusCode: 200,
		message: "retrieved Images successful",
		imageArray: imageInfoArray,
		totalImageCount: totalImageCount
	};
});

type ImageInfo = {
	id: string;
	title: string;
	description: string;
	url: string;
};

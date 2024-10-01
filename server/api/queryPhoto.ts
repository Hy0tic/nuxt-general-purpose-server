import { off } from "process";
import ConstructR2Url from "../utils/UrlConstruct";

export default defineEventHandler(async (event) => {
	if (!event.context.session) {
		throw createError({
			message: "Unauthorized",
			statusCode: 401
		});
	}

	const query = getQuery(event);
	const searchQuery = query.searchQuery?.toString();
	const pageNumber = query.pageNumber ?? 0;
	const imageCountPerPage = Number(query.imageCountPerPage) ?? 30;
	const offset = Number(pageNumber) * Number(imageCountPerPage);

	let queryResult: any;

	if (searchQuery) {
		queryResult = await prisma.$queryRaw`
			SELECT *
			FROM "Photo" p
			WHERE LOWER(p."Title") LIKE '%' || LOWER(${searchQuery}) || '%'
			ORDER BY "UploadDate" DESC
			LIMIT ${imageCountPerPage} OFFSET ${offset};
		`;
	} else {
		queryResult = await prisma.$queryRaw`
				select * from "Photo" p
				order by "UploadDate" desc 
				limit ${imageCountPerPage} offset ${offset}
			`; // note: to go to next page, you have to add amount of items on a page to offset, eg: if page limit is 25, add 25 to offset to go to next page.
	}

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

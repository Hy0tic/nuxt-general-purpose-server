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
	const sortOption: string = query.sortOption?.toString() ?? "";

	let queryResult: any;

	const sortQuery: string = SortQueryOptions.get(sortOption) ?? "";

	// TODO: is this vulnerable to SQL injection?
	if (searchQuery) {
		queryResult = await prisma.$queryRawUnsafe(`
			SELECT *
			FROM "Photo" p
			WHERE LOWER(p."Title") LIKE '%' || LOWER(${searchQuery}) || '%'
			${sortQuery} 
			LIMIT ${imageCountPerPage} OFFSET ${offset}
		`);
	} else {
		queryResult = await prisma.$queryRawUnsafe(`
			SELECT *
			FROM "Photo" p
			${sortQuery} 
			LIMIT ${imageCountPerPage} OFFSET ${offset}
		`);
	}

	const totalImageCount = await prisma.photo.count();

	// Mapping the array to the ImageInfo type
	const imageInfoArray: ImageInfo[] = queryResult.map(
		(photo: {
			Id: string;
			Title: any;
			Description: any;
			UploadDate: any;
			FileKey: any;
		}) => ({
			id: photo.Id,
			title: photo.Title,
			description: photo.Description,
			uploadDate: photo.UploadDate,
			url: ConstructR2Url(photo.FileKey) // Constructing URL using the FileKey
		})
	);

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
	uploadDate: Date;
};

// mapping query options
const SortQueryOptions: Map<string, string> = new Map([
	["SORT_BY_DATE", 'ORDER BY "UploadDate" DESC'],
	["SORT_BY_TITLE", 'ORDER BY LOWER("Title") ASC'],
	["SORT_BY_DATE_REVERSE", 'ORDER BY "UploadDate" ASC'],
	["SORT_BY_TITLE_REVERSE", 'ORDER BY LOWER("Title") DESC']
]);

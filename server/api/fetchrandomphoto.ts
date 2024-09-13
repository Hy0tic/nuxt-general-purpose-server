import { defineEventHandler } from 'h3';
import { FetchRandomPhoto } from '../utils/PostgresSqlDb';
import { BucketDomain } from '../utils/R2';
import { Photo } from '@prisma/client';

export default defineEventHandler(async (event) => {
	const res: Photo = await FetchRandomPhoto();

	return {
		message: "random photo here",
		result: ConstructR2Url(res.FileKey),
		status: 'success',
	}
})

function ConstructR2Url(fileKey: string){
	var url = `${BucketDomain}/${fileKey}`
	return url;
}
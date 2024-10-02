export default function ConstructR2Url(fileKey: string): string {
	const url = `https://${BucketDomain}/${fileKey}`;
	return url;
}

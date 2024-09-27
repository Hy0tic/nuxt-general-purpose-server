export default function ConstructR2Url(fileKey: string): string {
	var url = `https://${BucketDomain}/${fileKey}`;
	return url;
}

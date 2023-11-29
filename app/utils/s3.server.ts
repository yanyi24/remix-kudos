import {
	unstable_parseMultipartFormData,
	UploadHandler,
} from "@remix-run/node";
import { GetObjectCommand, PutObjectCommand, S3Client  } from "@aws-sdk/client-s3";
import cuid from "cuid";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new S3Client({
	region: process.env.KUDOS_BUCKET_REGION,
});

async function convertToBuffer(data: AsyncIterable<Uint8Array>) {
	const result = [];
	for await (const chunk of data) {
	  result.push(chunk);
	}
	return Buffer.concat(result);
}


const uploadHandler: UploadHandler = async ({ name, filename = '', contentType, data }) => {
	if (name !== "profile-pic") {
		return undefined;
	}

	const config = {
		Bucket: process.env.KUDOS_BUCKET_NAME || "",
		Key: `${cuid()}.${filename.split(".").slice(-1)}`,
	}
	const getObjectCommand = new GetObjectCommand(config);
	const putObjectCommand = new PutObjectCommand({
	    ...config,
		Body: await convertToBuffer(data)
	});
	try {
		await client.send(putObjectCommand);
		const signedUrl = await getSignedUrl(client, getObjectCommand);
		
		return signedUrl.split('?')[0];
	  } catch (err) {
		return null;
	  }
};

export async function uploadAvatar(request: Request) {
	const formData = await unstable_parseMultipartFormData(
		request,
		uploadHandler
	);

	const file = formData.get("profile-pic")?.toString() || "";
	return file;
}

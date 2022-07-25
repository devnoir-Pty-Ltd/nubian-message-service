import crypto from 'crypto';
import { promisify } from 'util';
import S3 from 'aws-sdk/clients/s3';
// import config from 'config';

const randomBytes = promisify(crypto.randomBytes);

const region = <string>process.env.REGION;
const bucketName = <string>process.env.BUCKET_NAME;
const accessKeyId = <string>process.env.ACCESS_KEY_ID;
const secretAccessKey = <string>process.env.SECRET_ACCESS_KEY;

const s3: S3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: 'v4',
});

// uploads a file to s3
const generateUrl = async () => {
	const rawBytes = await randomBytes(16);
	const imageName = rawBytes.toString('hex');

	const params = {
		Bucket: bucketName,
		Key: imageName,
		Expires: 60,
	};

	const uploadURL = <string>await s3.getSignedUrlPromise('putObject', params);
	return uploadURL;
};

export default { generateUrl };

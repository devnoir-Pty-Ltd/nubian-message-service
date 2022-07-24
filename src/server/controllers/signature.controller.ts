import { log } from '@root/utils';
import { Request, Response, NextFunction } from 'express';
import { s3SignatureHelper } from '@root/utils';
import createError from 'http-errors';

const getSignature: (req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next) => {
	try {
		const url = await s3SignatureHelper.generateUrl();
		if (!url) {
			log.error('[signature-controller] getSignature failure');
			next(new createError.InternalServerError());
		}
		log.info('[signature-controller] Signature received');
		res.status(200).json(url);
	} catch (error) {
		res.status(404).json({ message: error.message });
		log.error('[channel controller ] get Channels', error);
		next(error);
	}
};

export default { getSignature };

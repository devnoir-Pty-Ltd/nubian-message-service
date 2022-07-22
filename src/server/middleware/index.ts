import JWT from 'jsonwebtoken';
import config from 'config';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

const SECRET = <string>config.get('ACCESS_TOKEN_SECRET');
export const verifyAccessToken: (req: Request | any, _res: Response, next: NextFunction) => Promise<void> = async (
	req,
	_res,
	next,
) => {
	if (!req.headers['authorization']) next(new createError.InternalServerError());
	const authHeader = req.headers['authorization'];
	const bearerToken = authHeader.split(' ');
	const token = bearerToken[1];
	if (!token) next(new createError.InternalServerError());
	const secret = SECRET;
	JWT.verify(token, secret, (err: Error, payload: any) => {
		if (err) {
			const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
			next(new createError.Unauthorized(message));
		}
		req.payload = payload;
		next();
	});
};

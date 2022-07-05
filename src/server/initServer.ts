import config from 'config';
import morgan from 'morgan';
import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { log } from '@root/utils';
import msgRouter from '@root/server/routes/message.routes';

const PORT = <number>config.get('PORT') || 7102;
const app: Express = express();

const loggerStream = {
	write: (text: string) => {
		log.info(text);
	},
};
const initServer = () => {
	app.use(morgan('combined', { stream: loggerStream }));
	app.use(
		cors({
			origin: (_, callback) => callback(null, true),
			credentials: true,
			preflightContinue: true,
			exposedHeaders: [
				'Access-Control-Allow-Headers',
				'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept',
				'X-Password-Expired',
			],
			optionsSuccessStatus: 200,
		}),
	);
	app.use(express.json());

	// use the created routes to
	app.use('/api/v1/messages', msgRouter);
	app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
		res.status(err.status || 500);
		res.send({
			error: {
				status: err.status || 500,
				message: err.message,
			},
		});
		next();
	});

	app.listen(PORT, () => {
		log.info(`message-service listening on port ${PORT}`);
	});
};

export default initServer;

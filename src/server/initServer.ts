import * as config from 'config';
import * as morgan from 'morgan';
import * as express from 'express';
import { Express } from 'express';
import * as cors from 'cors';

import { log } from '@root/utils';

const initServer: () => Promise<void> = async () => {
	const PORT = <number>config.get('PORT') || 7001;
	const app: Express = express();

	const loggerStream = {
		write: (text: string) => {
			log.info(text);
		},
	};
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

	app.listen(PORT, () => {
		log.info(`message-service listening on port ${PORT}`);
	});
};

export default initServer;

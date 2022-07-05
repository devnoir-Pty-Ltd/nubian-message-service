import { log } from '@root/utils';
import initDB from '@root/db/connection';
import initServer from '@root/server/initServer';

initDB()
	.then(() => {
		initServer();
	})
	.catch((error) => {
		log.error('[message-service] index initDB', error);
	});

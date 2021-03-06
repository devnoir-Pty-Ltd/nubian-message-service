import config from 'config';
import mongoose from 'mongoose';
import { log } from '@root/utils';

const CONNECTION_URL = <string>config.get('CONNECTION_URL');

const initDB = async () => {
	try {
		await mongoose.connect(CONNECTION_URL);
		log.info('[db connection] database connected');
	} catch (error) {
		log.error('[db connection] database connected', error);
	}
};

export default initDB;

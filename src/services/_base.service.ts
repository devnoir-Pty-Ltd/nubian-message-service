import * as got from 'got';
import { Got } from 'got';
import { uriConfig } from '@root/services/config';

export class BaseService {
	_got: Got;
	_SERVICE_URI: string;

	public get SERVICE_URI() {
		return this._SERVICE_URI;
	}
	public set SERVICE_URI(newValue: string) {
		this._SERVICE_URI = newValue;
	}
	public get got() {
		return this._got;
	}
	public set got(newValue: Got | any) {
		this._got = newValue;
	}

	constructor(SERVICE_URI: string) {
		this.got = got;
		this.SERVICE_URI = <string>uriConfig.get(SERVICE_URI);
	}

	fetchData: (path: string, token: string) => Promise<any> = async (path, token) => {
		try {
			if (!token) return new Error('Unauthorized');
			const response = await this.got
				.get(`${this.SERVICE_URI}/${path}`, {
					headers: {
						'content-type': 'application/json;charset=UTF-8',
						Authorization: 'Bearer ' + token,
					},
				})
				.json();
			return response;
		} catch (error) {
			error.status = 401;
			return error;
		}
	};

	createItem: (path: string, data: any, token?: any | null) => Promise<void> = async (path, data, token) => {
		try {
			const response = await this.got
				.post(`${this.SERVICE_URI}/${path}`, {
					json: data,
					headers: {
						'content-type': 'application/json;charset=UTF-8',
						Authorization: 'Bearer ' + token,
					},
				})
				.json();
			return response;
		} catch (error) {
			return error;
		}
	};
}

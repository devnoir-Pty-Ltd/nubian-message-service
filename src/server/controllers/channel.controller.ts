import mongoose from 'mongoose';
import createError from 'http-errors';
import { messageValidator } from '@root/lib/validators';
import { Request, Response, NextFunction } from 'express';

import { log } from '@root/utils';
import Channel from '@root/db/models/channel';
import Message from '@root/db/models/message';

export type TChannel = {
	accountId: string;
	title: string;
};

const getChannels: (req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next) => {
	try {
		const channels: TChannel[] = await Channel.find();

		res.status(200).json(channels);
	} catch (error) {
		res.status(404).json({ message: error.message });
		log.error('[message controller ] get Channels', error);
		next(error);
	}
};
const createChannel: (req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next) => {
	try {
		const value: TChannel = await messageValidator.validateAsync(req.body);
		const newChannel: TChannel | unknown = await Channel.create({ ...value });

		if (!newChannel) next(new createError.InternalServerError());

		log.info('[message controller ] send message-success');
		res.status(201).json(newChannel);
	} catch (error) {
		if (error.isJoi) error.status = 422;
		log.error('[message controller ] send message', error);
		next(error);
	}
};

const getMessage: (req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next) => {
	const { id: _id } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(_id)) next(new createError.NotFound());
		const post = await Message.findById(_id);
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
		log.error('[message controller ] get Message', error);
		next(error);
	}
};

const deleteChannel: (req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next) => {
	const { id: _id } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(_id)) next(new createError.BadRequest(`No post with id: ${_id}`));
		await Channel.findByIdAndRemove(_id);
		res.status(201).json({ message: 'Channel deleted successfully.' });
	} catch (error) {
		log.error('[message controller ] delete Channel', error);
		next(error);
	}
};

const updateChannel: (req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next) => {
	const { id: _id } = req.params;
	const { title } = req.body;
	try {
		if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with _id: ${_id}`);
		const channel = await Channel.findById(_id);
		const updatedChannel = { ...channel, title, _id };

		await Channel.findByIdAndUpdate(_id, updatedChannel, { new: true });
		res.status(200).json(updatedChannel);
	} catch (error) {
		log.error('[message controller ] update Message', error);
		next(error);
	}
};

export default {
	createChannel,
	updateChannel,
	getMessage,
	getChannels,
	deleteChannel,
};

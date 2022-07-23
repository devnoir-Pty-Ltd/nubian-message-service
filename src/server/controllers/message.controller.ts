import mongoose from 'mongoose';
import createError from 'http-errors';
import { messageValidator } from '@root/lib/validators';
import { Request, Response, NextFunction } from 'express';

import { log } from '@root/utils';
import Message from '@root/db/models/message';

export type TMessage = {
	channelId?: string;
	senderId: string;
	senderType: string;
	receiverType: string;
	receiverId: string;
	text: string;
	imageSrc: string;
};

const getMessages: (req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next) => {
	try {
		const messages: TMessage[] = await Message.find();

		res.status(200).json(messages);
	} catch (error) {
		res.status(404).json({ message: error.message });
		log.error('[message controller ] get messages', error);
		next(error);
	}
};
const sendMessage: (req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next) => {
	try {
		const value: TMessage = await messageValidator.validateAsync(req.body);
		const newMsg: TMessage | unknown = await Message.create({ ...value });

		if (!newMsg) next(new createError.InternalServerError());

		log.info('[message controller ] send message-success');
		res.status(201).json(newMsg);
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

const deleteMessage: (req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next) => {
	const { id: _id } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(_id)) next(new createError.BadRequest(`No post with id: ${_id}`));
		await Message.findByIdAndRemove(_id);
		res.status(201).json({ message: 'Message deleted successfully.' });
	} catch (error) {
		log.error('[message controller ] delete Message', error);
		next(error);
	}
};

const updateMessage: (req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next) => {
	const { id: _id } = req.params;
	const { text, senderId, senderType, receiverId, receiverType, imageSrc } = req.body;
	try {
		if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with _id: ${_id}`);

		const updatedMessage = { text, senderId, senderType, receiverId, receiverType, imageSrc, _id };

		await Message.findByIdAndUpdate(_id, updatedMessage, { new: true });

		res.status(200).json(updatedMessage);
	} catch (error) {
		log.error('[message controller ] update Message', error);
		next(error);
	}
};

export default {
	sendMessage,
	updateMessage,
	getMessage,
	getMessages,
	deleteMessage,
};

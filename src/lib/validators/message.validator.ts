import Joi, { Schema } from 'joi';

const messageValidator: Schema = Joi.object({
	senderId: Joi.string().required(),
	senderType: Joi.string().valid('USER', 'CHANEL').required(),
	receiverId: Joi.string().required(),
	receiverType: Joi.string().valid('USER', 'CHANEL').required(),
	text: Joi.string().min(2).required(),
	imageSrc: Joi.string(),
});

export default messageValidator;

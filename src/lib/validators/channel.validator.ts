import Joi, { Schema } from 'joi';

const channelValidator: Schema = Joi.object({
	accountId: Joi.string().required(),
	title: Joi.string().min(2).required(),
	imageSrc: Joi.string(),
});

export default channelValidator;

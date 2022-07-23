import { model, Schema } from 'mongoose';
import Message from './message';

const ChannelSchema = new Schema(
	{
		accountId: { type: String, required: true },
		title: { type: String, required: true },
		messages: [Message],
	},
	{ timestamps: true },
);
// create a model
const Channel = model('Channel', ChannelSchema);

export default Channel;

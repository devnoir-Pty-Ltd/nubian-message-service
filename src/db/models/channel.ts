import { model, Schema } from 'mongoose';

const ChannelSchema = new Schema(
	{
		accountId: { type: String, required: true },
		title: { type: String, required: true },
		imageSrc: { type: String, required: false },
	},
	{ timestamps: true },
);
// create a model
const Channel = model('Channel', ChannelSchema);

export default Channel;

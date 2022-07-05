// / destructure model function and Schema constructor from mongoose
import { model, Schema } from 'mongoose';

const MessageSchema = new Schema(
	{
		senderId: { type: String, required: true },
		senderType: { type: String, required: true },
		receiverType: { type: String, required: true },
		receiverId: { type: String, required: true },
		text: { type: String, required: true },
		imageSrc: String,
	},
	{ timestamps: true },
);
// create a model
const Message = model('Message', MessageSchema);

export default Message;

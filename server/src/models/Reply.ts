import { model, Model, Schema, Types } from "mongoose";
import { IReplySchema } from "../types";

const ReplySchema = new Schema({
	commentId: {
		type: Types.ObjectId,
		ref: "Comment",
		required: true
	},
	reply: {
		type: String,
		required: true
	},
	userId: {
		type: Types.ObjectId,
		ref: "User",
		required: true
	}
});

const Reply: Model<IReplySchema> = model("Reply", ReplySchema);
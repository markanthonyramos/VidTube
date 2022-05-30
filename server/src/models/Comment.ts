import { model, Model, Schema, Types } from "mongoose";
import { ICommentSchema } from "../types";

const CommentSchema = new Schema({
	videoId: {
		type: Types.ObjectId,
		ref: "Video",
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	userId: {
		type: Types.ObjectId,
		ref: "User",
		required: true
	}
});

export const Comment: Model<ICommentSchema> = model("Comment", CommentSchema);
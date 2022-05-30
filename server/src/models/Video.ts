import { Model, model, Schema, Types } from "mongoose";
import { IVideoSchema } from "../types";

const VideoSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	postedBy: {
		type: Types.ObjectId,
		ref: "User",
		required: true
	},
	path: {
		type: String,
		required: true
	},
	filename: {
		type: String,
		required: true
	},
	mimetype: {
		type: String,
		required: true
	},
	createdAt: {
		type: String,
		required: true
	}
});

export const Video: Model<IVideoSchema> = model("Video", VideoSchema)
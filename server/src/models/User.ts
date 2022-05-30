import { Schema, model, Model } from "mongoose";
import { IUserSchema } from "../types";

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: String,
		required: true
	}
});

export const User: Model<IUserSchema> = model("User", UserSchema);
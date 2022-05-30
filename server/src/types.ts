import { Document } from "mongoose";
import { Request, Response } from "express";
import { ReadStream } from "fs";

export type IUserSchema = Document & {
	username: string
	password: string
	createdAt: Date
}

export type IUserInput = {
	userId: string
	input: {
		username: string
		password: string
	}
}

export type IUserResult = {
	id: string
	username: string
}

export type IMessageSuccess = {
	message: string
	success: boolean
}

export type IAuthenticateResult = IMessageSuccess & {
	accessToken?: string
	username?: string
}

export type IExpressContext = {
	req: Request
	res: Response
}

export type IVideoSchema = Document & {
	title: string
	description: string
	postedBy: string
	path: string
	filename: string
	mimetype: string
	createdAt: string
}

export type IVideoInput = {
	videoId: string
	input: {
		video: Promise<{
			filename: string
			mimetype: string
			encoding: string
			createReadStream(): ReadStream
		}>
		title: string
		description: string
	}
}

export type IVideo = {
	id: string
	title: string
	description: string
	postedBy: any
	url: string
	createdAt: string
}

export type IVideoResult = IMessageSuccess & {
	videos?: IVideo[]
}

export type IToken = {
	id: string
  username?: string
  iat: Date
  exp: Date
}

export type IAccessTokenValid = IMessageSuccess & {
	user: IUserSchema
}

export type ICommentSchema = Document & {
	videoId: any
	comment: string
	userId: any
}

export type IReplySchema = Document & {
	commentId: any
	reply: string
	userId: any
}

export type ICommentInput = {
	input: {
		videoId: string
		comment: string
	}
}

export type IComment = {
	id: string
	videoId: string
	comment: string
	user: any
}

export type ICommentResult = IMessageSuccess & {
	comments: IComment[]
}
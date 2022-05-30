export type IMessageSuccess = {
	message: string
	success: boolean
}

export type ILogin = {
	login: IMessageSuccess & {
		accessToken?: string
		username?: string
	}
}

export type ILogout = {
	logout: IMessageSuccess & {
		accessToken?: string
	}
}

export type IRefreshToken = {
	refreshToken: IMessageSuccess & {
		accessToken?: string
		username?: string
	}
}

export type ICreateUser = {
	createUser: IMessageSuccess
}

export type IUploadVideo = {
	uploadVideo: IMessageSuccess
}

type IVideos = [{
	id: string
	title: string
	description: string
	postedBy: {
		id: string
		username: string
	}
	url: string
	createdAt: string
}]

export type IVideosResult = IMessageSuccess & {
	videos: IVideos
}

export type IMyVideos = {
	myVideos: IVideosResult
}

export type IVideoById = {
	videoById: IVideosResult
}

export type IRecommendedVideos = {
	recommendedVideos: IVideosResult
}

export type INewsFeedVideos = {
	newsFeedVideos: IVideosResult
}

export type ICreateComment = {
	createComment: IMessageSuccess
}

export type IComments = {
	id: string
	videoId: any
	comment: string
	user: any
}

export type IGetComments = {
	getComments: IMessageSuccess & {
		comments: IComments[]
	}
}
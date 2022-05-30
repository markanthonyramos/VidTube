import { IResolvers } from "apollo-server-express";
import { createWriteStream } from "fs";
import { IAccessTokenValid, IExpressContext, IMessageSuccess, IVideoInput, IVideoResult, IVideoSchema } from "../../types";
import { join, resolve } from "path";
import { Video } from "../../models/Video";
import { createVideoUrl } from "../../utils/createVideoUrl";
import { createDateTime } from "../../utils/createDateTime";
import { validateAccessToken } from "../../utils/validateAccessToken";
import { deconstructAsyncAwait } from "../../utils/deconstructAsyncAwait";

require("dotenv").config();

export const VideoResolvers: IResolvers = {
	Query: {
		recommendedVideos: async (_: void, { videoId }: IVideoInput, { req }: IExpressContext): Promise<IVideoResult> => {
			const [validateAccessTokenResult, validateAccessTokenError]: [IAccessTokenValid, any] = await deconstructAsyncAwait(validateAccessToken(req));

			if (validateAccessTokenError || !validateAccessTokenResult.success) {
				validateAccessTokenError && console.error(validateAccessTokenError);

				return validateAccessTokenResult;
			}
			
			const [queryVideosResult, queryVideosError]: [IVideoSchema[], any] = await deconstructAsyncAwait(Video
				.find().where("_id").ne(videoId)
				.populate("postedBy", "id, username")
				.exec());
				
			if (queryVideosError) {
				console.error(queryVideosError);
				
				return {
					message: "An error occured while querying on the database.",
					success: false
				}
			}

			if (queryVideosResult.length >= 1) {
				const videos = queryVideosResult.map(({ id, title, description, postedBy, filename, createdAt }) => ({
					id,
					title,
					description,
					postedBy,
					url: createVideoUrl(filename),
					createdAt
				}));

				return {
					videos,
					message: `${queryVideosResult.length} videos found.`,
					success: true
				}
			}
			
			return {
				message: "No videos found.",
				success: true
			}
		},
		videoById: async (_: void, { videoId }: IVideoInput, { req }: IExpressContext): Promise<IVideoResult> => {
			const [validateAccessTokenResult, validateAccessTokenError]: [IAccessTokenValid, any] = await deconstructAsyncAwait(validateAccessToken(req));

			if (validateAccessTokenError || !validateAccessTokenResult.success) {
				validateAccessTokenError && console.error(validateAccessTokenError);

				return validateAccessTokenResult;
			}
			
			const [queryVideoResult, queryVideoError] = await deconstructAsyncAwait(Video
				.findById(videoId)
				.populate("postedBy", "id username")
				.exec());

			if (queryVideoError) {
				console.error(queryVideoError);

				return {
					message: "Video does not exist.",
					success: true
				}
			}
			
			return {
				videos: [{
					id: queryVideoResult.id,
					title: queryVideoResult.title,
					description: queryVideoResult.description,
					postedBy: queryVideoResult.postedBy,
					url: createVideoUrl(queryVideoResult.filename),
					createdAt: queryVideoResult.createdAt
				}],
				message: "Video was found.",
				success: true
			}
		},
		myVideos: async (_: void, args: void, { req }: IExpressContext): Promise<IVideoResult> => {
			const [validateAccessTokenResult, validateAccessTokenError]: [IAccessTokenValid, any] = await deconstructAsyncAwait(validateAccessToken(req));

			if (validateAccessTokenError || !validateAccessTokenResult.success) {
				validateAccessTokenError && console.error(validateAccessTokenError);

				return validateAccessTokenResult;
			}

			const [queryVideosResult, queryVideosError]: [IVideoSchema[], any] = await deconstructAsyncAwait(Video
				.find().where("postedBy").equals(validateAccessTokenResult.user.id)
				.populate("postedBy", "id username")
				.exec());

			if (queryVideosError) {
				console.error(queryVideosError);
				
				return {
					message: "An error occured while querying on the database.",
					success: false
				}
			}
			
			if (queryVideosResult.length >= 1) {
				const videos = queryVideosResult.map(({ id, title, description, postedBy, filename, createdAt }) => ({
					id,
					title,
					description,
					postedBy,
					url: createVideoUrl(filename),
					createdAt
				}));

				return {
					videos,
					message: `${queryVideosResult.length} videos found.`,
					success: true
				}
			}

			return {
				message: "You haven't uploaded a video yet.",
				success: true
			}
		},
		newsFeedVideos: async (_: void, args: void, { req }: IExpressContext): Promise<IVideoResult> => {
			const [validateAccessTokenResult, validateAccessTokenError]: [IAccessTokenValid, any] = await deconstructAsyncAwait(validateAccessToken(req));

			if (validateAccessTokenError || !validateAccessTokenResult.success) {
				validateAccessTokenError && console.error(validateAccessTokenError);

				return validateAccessTokenResult;
			}

			const [queryVideosResult, queryVideosError]: [IVideoSchema[], any] = await deconstructAsyncAwait(Video
				.find()
				.populate("postedBy", "id username")
				.exec());

			if (queryVideosError) {
				console.error(queryVideosError);

				return {
					message: "An error occured while querying on the database.",
					success: false
				}
			}

			const videos = queryVideosResult.map(({ id, title, description, postedBy, filename, createdAt }) => ({
				id,
				title,
				description,
				postedBy,
				url: createVideoUrl(filename),
				createdAt
			}));

			return {
				videos,
				message: `${queryVideosResult.length} videos found.`,
				success: true
			}
		}
	},
	Mutation: {
		uploadVideo: async (_: void, { input }: IVideoInput, { req }: IExpressContext): Promise<IMessageSuccess> => {
			const [validateAccessTokenResult, validateAccessTokenError]: [IAccessTokenValid, any] = await deconstructAsyncAwait(validateAccessToken(req));

			if (validateAccessTokenError || !validateAccessTokenResult.success) {
				validateAccessTokenError && console.error(validateAccessTokenError);

				return validateAccessTokenResult;
			}
			
			const [videoResult, videoError] = await deconstructAsyncAwait(input.video);

			if (videoError) {
				console.error(videoError);

				return {
					message: "No video sent or found from the request.",
					success: false
				}
			}
			
			const { createReadStream, filename, mimetype } = videoResult;

			const relativePath = join("src/assets/", filename);
			const absolutePath = join(resolve(__dirname), "../../../", relativePath);
			
			const [saveVideoResult, saveVideoError] = await deconstructAsyncAwait(Video.create({
				title: input.title,
				description: input.description,
				postedBy: validateAccessTokenResult.user.id,
				path: absolutePath,
				filename,
				mimetype,
				createdAt: createDateTime()
			}));

			if (saveVideoError) {
				console.error(saveVideoError);
				
				return {
					message: "An error occured while saving the video to the database.",
					success: false
				}
			}

			const [writeVideoResult, writeVideoError] = await deconstructAsyncAwait(new Promise((res, rej) => {
				createReadStream()
					.on("error", rej)
					.on("close", res)
					.pipe(createWriteStream(relativePath));
			}));

			if (writeVideoError) {
				console.error(writeVideoError);

				return {
					message: "An error occured while writing the video.",
					success: false
				}
			}

			return {
				message: "Video has been uploaded.",
				success: true
			}
		}
	}
}
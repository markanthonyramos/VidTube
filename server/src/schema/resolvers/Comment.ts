import { IResolvers } from "apollo-server-express";
import { Comment } from "../../models/Comment";
import { IAccessTokenValid, ICommentInput, ICommentResult, ICommentSchema, IExpressContext, IMessageSuccess } from "../../types";
import { deconstructAsyncAwait } from "../../utils/deconstructAsyncAwait";
import { validateAccessToken } from "../../utils/validateAccessToken";

export const CommentResolvers: IResolvers = {
	Query: {
		getComments: async (_: void, { videoId }, { req }: IExpressContext): Promise<ICommentResult | IMessageSuccess> => {
			const [validateAccessTokenResult, validateAccessTokenError]: [IAccessTokenValid, any] = await deconstructAsyncAwait(validateAccessToken(req));

			if (validateAccessTokenError || !validateAccessTokenResult.success) {
				validateAccessTokenError && console.error(validateAccessTokenError);

				return validateAccessTokenResult;
			}
			
			const [queryCommentsResult, queryCommentsError]: [ICommentSchema[], any] = await deconstructAsyncAwait(Comment
				.find()
				.where("videoId")
				.equals(videoId)
				.populate("userId", "id username")
				.exec()
			);
			
			if (queryCommentsError) {
				console.error(queryCommentsError);

				return {
					message: "An error occured while querying to the database.",
					success: false
				}
			}

			const comments = queryCommentsResult.map(({ id, videoId, comment, userId }) => ({
				id,
				videoId,
				comment,
				user: userId
			}));

			return {
				comments,
				message: "Comments has been retrieved successfully.",
				success: true
			}
		}
	},
	Mutation: {
		createComment: async (_: void, { input }: ICommentInput, { req }: IExpressContext): Promise<IMessageSuccess> => {
			const [validateAccessTokenResult, validateAccessTokenError]: [IAccessTokenValid, any] = await deconstructAsyncAwait(validateAccessToken(req));

			if (validateAccessTokenError || !validateAccessTokenResult.success) {
				validateAccessTokenError && console.error(validateAccessTokenError);

				return validateAccessTokenResult;
			}

			const [createCommentResult, createCommentError]: [ICommentSchema, any] = await deconstructAsyncAwait(Comment.create({
				videoId: input.videoId,
				comment: input.comment,
				userId: validateAccessTokenResult.user.id
			}));

			if (createCommentError) {
				console.error(createCommentError);

				return {
					message: "An error occured while saving the comment to the database.",
					success: false
				}
			}

			return {
				message: "Comment has been uploaded.",
				success: true
			}
		}
	}
}
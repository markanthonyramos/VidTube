import { gql } from "apollo-server-express";

export const schemaTypeDefs = gql`
	type MessageSuccess {
		message: String!
		success: Boolean!
	}

	type Query {
		# User
		users: [UserResult]
		userById(userId: ID!): UserResult

		# Video
		recommendedVideos(videoId: ID!): VideoResult!
		videoById(videoId: ID!): VideoResult!
		myVideos: VideoResult!
		newsFeedVideos: VideoResult!

		# Comment
		getComments(videoId: ID!): CommentResult!
	}

	type Mutation {
		# User
		createUser(input: UserInput!): MessageSuccess!
		updateUser(userId: ID!, input: UserInput!): MessageSuccess!
		deleteUser(userId: ID!): MessageSuccess!

		# Authenticate
		login(input: UserInput!): AuthenticateResult!
		logout: MessageSuccess!
		refreshToken: AuthenticateResult!

		# Video
		uploadVideo(input: VideoInput!): MessageSuccess!

		# Comment
		createComment(input: CommentInput!): MessageSuccess!
	}
`;

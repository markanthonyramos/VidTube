import { gql } from "apollo-server-express";

export const CommentTypeDefs = gql`
	input CommentInput {
		videoId: ID!
		comment: String!
	}

	type Comment {
		id: ID!
		videoId: ID!
		comment: String!
		user: UserResult!
	}

	type CommentResult {
		comments: [Comment!]
		message: String!
		success: Boolean!
	}
`;
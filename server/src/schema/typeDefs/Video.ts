import { gql } from "apollo-server-core";

export const VideoTypeDefs = gql`
	type VideoResult {
		videos: [Video!]
		message: String!
		success: Boolean!
	}

	type Video {
		id: ID!
		title: String!
		description: String!
		postedBy: UserResult!
		url: String!
		createdAt: String!
	}

	input VideoInput {
		video: Upload!
		title: String!
		description: String!
	}
`;
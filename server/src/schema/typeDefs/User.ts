import { gql} from "apollo-server-express";

export const UserTypeDefs = gql`
	type UserResult {
		id: ID!
		username: String!
	}

	input UserInput {
		username: String
		password: String
	}
`;
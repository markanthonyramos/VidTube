import { gql } from "apollo-server-express";

export const AuthenticateTypeDefs = gql`
	type AuthenticateResult {
		accessToken: String
		message: String!
		success: Boolean!
		username: String
	}
`;
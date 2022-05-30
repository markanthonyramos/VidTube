import { gql } from "@apollo/client/core";

export const REFRESH_TOKEN = gql`
	mutation {
		refreshToken {
			message
			accessToken
			success
			username
		}
	}
`;
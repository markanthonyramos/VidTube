import { gql } from "@apollo/client/core";

export const LOGIN = gql`
	mutation($input: UserInput!) {
		login(input: $input) {
			message
			accessToken
			success
			username
		}
	}
`;
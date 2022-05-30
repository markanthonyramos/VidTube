import { gql } from "@apollo/client/core";

export const CREATE_USER = gql`
	mutation($input: UserInput!) {
		createUser(input: $input) {
			message
			success
		}
	}
`;
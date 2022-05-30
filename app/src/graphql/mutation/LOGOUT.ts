import { gql } from "@apollo/client/core";

export const LOGOUT = gql`
	mutation {
		logout {
			message
			success
		}
	}
`;
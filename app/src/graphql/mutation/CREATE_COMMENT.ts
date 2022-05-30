import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
	mutation($input: CommentInput!) {
		createComment(input: $input) {
			message
			success
		}
	}
`;
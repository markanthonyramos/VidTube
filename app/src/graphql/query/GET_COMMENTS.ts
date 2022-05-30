import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
	query($videoId: ID!) {
		getComments(videoId: $videoId) {
			comments {
				id
				videoId
				comment
				user {
					id
					username
				}
			}
			message
			success
		}
	}
`;
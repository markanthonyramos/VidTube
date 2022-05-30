import gql from "graphql-tag";

export const VIDEO_BY_ID = gql`
	query($videoId: ID!) {
		videoById(videoId: $videoId) {
			videos {
				id
				title
				description
				postedBy {
					id
					username
				}
				url
				createdAt
			}
			message
			success
		}
	}
`;
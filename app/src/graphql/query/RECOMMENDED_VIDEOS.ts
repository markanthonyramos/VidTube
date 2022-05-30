import gql from "graphql-tag";

export const RECOMMENDED_VIDEOS = gql`
	query($videoId: ID!) {
		recommendedVideos(videoId: $videoId) {
			videos {
				id
				title
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
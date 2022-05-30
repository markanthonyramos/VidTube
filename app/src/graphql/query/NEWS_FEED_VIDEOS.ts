import { gql } from "@apollo/client";

export const NEWS_FEED_VIDEOS = gql`
	{
		newsFeedVideos {
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
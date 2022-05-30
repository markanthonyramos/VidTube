import gql from "graphql-tag";

export const MY_VIDEOS = gql`
	{
		myVideos {
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
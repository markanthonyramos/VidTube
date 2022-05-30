import { gql } from "@apollo/client";

export const UPLOAD_VIDEO = gql`
	mutation($input: VideoInput!) {
		uploadVideo(input: $input) {
			message
			success
		}
	}
`;
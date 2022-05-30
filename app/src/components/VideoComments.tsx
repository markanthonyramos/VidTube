import { gql, useMutation } from "@apollo/client";
import { FC, SyntheticEvent, useState } from "react";
import { useAccessToken } from "../contexts/AccessTokenContext";
import { CREATE_COMMENT } from "../graphql/mutation/CREATE_COMMENT";
import { ICreateComment } from "../types";
import { Error } from "./Error";
import { GetVideoComments } from "./GetVideoComments";
import { Loading } from "./Loading";

type Props = {
	videoId: string
}

export const VideoComments: FC<Props> = ({ videoId }) => {
	const [textareaRow, setTextareaRow] = useState(1);

	const accessToken = useAccessToken();

	const [createCommentFunc, {
		loading: createCommentLoading,
		error: createCommentError
	}] = useMutation<ICreateComment>(CREATE_COMMENT, {
		refetchQueries: [{
			query: gql`
				query($videoId: ID!) {
					getComments(videoId: $videoId) {
						comments {
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
			`,
			variables: {
				videoId
			},
			context: {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		}]
	});

	const handlers = {
		addTextareaRow: (e: any) => {
			const key = e.which || e.keyCode;
			
			if (key === 13) {
				setTextareaRow(textareaRow + 1);
				console.log(textareaRow);
			}
		},
		submit: async (e: SyntheticEvent<HTMLFormElement>) => {
			e.preventDefault();

			const { comment } = Object.fromEntries(new FormData(e.currentTarget));

			await createCommentFunc({
				variables: {
					input: {
						videoId,
						comment
					}
				},
				context: {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				}
			}).catch(err => console.error(err));
		}
	}

	if(createCommentLoading) return <Loading />;
	if(createCommentError) return <Error />;

	return(
		<div className="video-comments p-2.5 bg-white-background">
			<GetVideoComments videoId={videoId} />
			<form className="flex items-center mt-2.5" onSubmit={handlers.submit}>
				<textarea name="comment" placeholder="Add a comment..." rows={textareaRow} onKeyDown={handlers.addTextareaRow} className="w-full py-1.5 px-1 mr-1 border-b-2 border-primary focus:outline-none focus:placeholder-primary"></textarea>
				<button type="submit" className="bg-primary text-white-text py-1.5 px-2.5 mt-auto font-bold">Comment</button>
			</form>
		</div>
	);
}
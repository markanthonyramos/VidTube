import { useLazyQuery } from "@apollo/client";
import { FC, useEffect } from "react";
import { useAccessToken } from "../contexts/AccessTokenContext";
import { GET_COMMENTS } from "../graphql/query/GET_COMMENTS";
import { IGetComments } from "../types";
import { Error } from "./Error";
import { Loading } from "./Loading";

type Props = {
	videoId: string
}

export const GetVideoComments: FC<Props> = ({ videoId }) => {
	const accessToken = useAccessToken();
	
	const [getCommentsFunc, {
		loading: getCommentsLoading,
		error: getCommentsError,
		data: getCommentsData
	}] = useLazyQuery<IGetComments>(GET_COMMENTS);

	useEffect(() => {
		getCommentsFunc({
			variables: {
				videoId
			},
			context: {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		});
	}, [getCommentsFunc, accessToken, videoId]);

	if (getCommentsLoading) return <Loading />;
	if (getCommentsError) return <Error />;

	const conditionalRender = () => {
		if (getCommentsData?.getComments) {
			const { comments, message, success } = getCommentsData.getComments;

			if (comments.length > 0 && success) {
				return comments.map(({ id, comment, user, videoId }) => (
					<div key={id} className="bg-body-background p-1.5 mb-2">
						<h5 className="text-xs font-bold">{ user.username }</h5>
						<h4>{ comment }</h4>
					</div>
				));
			}
		}
	}

	return(
		<>
			<div>
				{ conditionalRender() }
			</div>
		</>
	);
}
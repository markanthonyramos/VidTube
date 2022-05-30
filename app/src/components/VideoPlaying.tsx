import { useLazyQuery } from "@apollo/client";
import { FC, useEffect } from "react";
import { useAccessToken } from "../contexts/AccessTokenContext";
import { useUpdateSuccess } from "../contexts/SuccessContext";
import { VIDEO_BY_ID } from "../graphql/query/VIDEO_BY_ID";
import { IVideoById } from "../types";
import { Error } from "./Error";
import { Loading } from "./Loading";

type Props = {
	videoId: string
}

export const VideoPlaying: FC<Props> = ({ videoId }) => {
	const accessToken = useAccessToken();

	const updateSuccess = useUpdateSuccess();

	const [videoByIdFunc, {
		loading: videoByIdLoading,
		error: videoByIdError,
		data: videoByIdData,
	}] = useLazyQuery<IVideoById>(VIDEO_BY_ID, {
		onCompleted: ({ videoById }) => {
			updateSuccess(videoById.success);
		}
	});
	
	useEffect(() => {
		videoByIdFunc({
			variables: {
				videoId
			},
			context: {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		});
	}, [videoByIdFunc, accessToken, videoId]);

	if (videoByIdLoading) return <Loading />;
	if (videoByIdError) return <Error />;
	
	const conditionalRender = () => {
		if (videoByIdData?.videoById) {
			const { videos, message, success } = videoByIdData?.videoById;
			
			if (success && videos) {
				return(
					<>
						<div className="video-player mx-auto bg-black-background">
							<video key={videos[0].url} controls className="mx-auto h-full">
								<source src={videos[0].url} type="video/mp4" />
							</video>
						</div>
						<div className="p-2.5">
							<h2 className="text-base font-bold">{videos[0].title}</h2>
							<h3 className="text-sm">Posted By: {videos[0].postedBy.username}</h3>
							<h4 className="text-xs">{videos[0].createdAt.split(",")[0]}</h4>
						</div>
					</>
				);
			} else if (success && !videos) {
				return(
					<h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
						{message}
					</h1>
				);
			} else if (!success && !videos) {
				return(
					<h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
						{message}
					</h1>
				);
			}
		}
	}

	return(
		<div className="video-playing mr-2.5 bg-white-background relative">
			{conditionalRender()}
		</div>
	);
}
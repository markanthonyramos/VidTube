import { useLazyQuery } from "@apollo/client";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccessToken } from "../contexts/AccessTokenContext";
import { RECOMMENDED_VIDEOS } from "../graphql/query/RECOMMENDED_VIDEOS";
import { IRecommendedVideos } from "../types";
import { Error } from "./Error";
import { Loading } from "./Loading";

type Props = {
	videoId: string
}

export const VideoRecommended: FC<Props> = ({ videoId }) => {
	const accessToken: string = useAccessToken();

	const [recommendedVideosFunc, {
		loading: recommendedVideosLoading,
		error: recommendedVideosError,
		data: recommendedVideosData
	}] = useLazyQuery<IRecommendedVideos>(RECOMMENDED_VIDEOS);
	
	useEffect(() => {
		recommendedVideosFunc({
			variables: {
				videoId
			},
			context: {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		});
	}, [recommendedVideosFunc, accessToken, videoId]);

	if (recommendedVideosLoading) return <Loading />;
	if (recommendedVideosError) return <Error />;
	
	const conditionalRender = () => {
		if (recommendedVideosData?.recommendedVideos) {
			const { videos, message, success } = recommendedVideosData?.recommendedVideos;
			
			if (success && videos) {
				const divStyle = "flex justify-center";
				
				return videos.map((video, index) => (
					<Link to={`/video/${video.id}`} key={video.id}>
						<div className={index === videos.length - 1 ? `${divStyle}` : `${divStyle} mb-2.5`}>
							<div className="w-40 h-24 mr-2.5 bg-black-background">
								<video controls className="h-full m-auto">
									<source src={video.url} type="video/mp4" />
								</video>
							</div>
							<div className="mr-auto">
								<h3 className="text-base font-bold">{video.title}</h3>
								<h4 className="text-sm">Posted By: {video.postedBy.username}</h4>
								<h5 className="text-xs">{video.createdAt.split(",")[0]}</h5>
							</div>
						</div>
					</Link>
				));
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
		<div className="recommended-videos p-2.5 bg-white-background mb-2.5 relative">
			{conditionalRender()}
		</div>
	);
}
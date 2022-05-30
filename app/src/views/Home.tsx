import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { useAccessToken } from "../contexts/AccessTokenContext";
import { NEWS_FEED_VIDEOS } from "../graphql/query/NEWS_FEED_VIDEOS";
import { INewsFeedVideos } from "../types";

export const Home: FC = () => {
	const accessToken: string = useAccessToken();

	const [newsFeedVideosFunc, {
		loading: newsFeedVideosLoading,
		error: newsFeedVideosError,
		data: newsFeedVideosData
	}] = useLazyQuery<INewsFeedVideos>(NEWS_FEED_VIDEOS);

	useEffect(() => {
		newsFeedVideosFunc({
			context: {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		});
	}, [newsFeedVideosFunc, accessToken]);

	if (newsFeedVideosLoading) return <Loading />;
	if (newsFeedVideosError) return <Error />

	const conditionalRender = () => {
		if (newsFeedVideosData?.newsFeedVideos) {
			const { videos, message, success } = newsFeedVideosData.newsFeedVideos;
			
			if (success && videos) {
				return(
					<div className="grid grid-cols-5 gap-2.5 p-2.5">
						{videos.map(video => (
							<div key={video.id} className="bg-white-background">
								<div className="bg-black-background flex items-center justify-center">
									<video src={video.url} controls className="h-40" />
								</div>
								<Link to={`/video/${video.id}`}>
									<div className="p-2.5">
										<h2 className="text-base font-bold">{video.title}</h2>
										<h3 className="text-sm">Posted By: {video.postedBy.username}</h3>
										<h4 className="text-xs">{video.createdAt.split(",")[0]}</h4>
									</div>
								</Link>
							</div>
						))}
					</div>
				);
			} else {
				return(
					<div>
						<h1>{message}</h1>
					</div>
				);
			}
		}
	}

	return (
		<div>
			{conditionalRender()}
		</div>
	);
}
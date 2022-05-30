import { useLazyQuery } from "@apollo/client";
import { FC, useEffect } from "react";
import { useAccessToken } from "../contexts/AccessTokenContext";
import { MY_VIDEOS } from "../graphql/query/MY_VIDEOS";
import { IMyVideos } from "../types";
import { Error } from "./Error";
import { Loading } from "./Loading";

export const ChannelUserVideos: FC = () => {
	const accessToken: string = useAccessToken();

	const [myVideosFunc, { 
		loading: myVideosLoading, 
		error: myVideosError, 
		data: myVideosData 
	}] = useLazyQuery<IMyVideos>(MY_VIDEOS);

	useEffect(() => {
		myVideosFunc({
			context: {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		});
	}, [myVideosFunc, accessToken]);

	if (myVideosLoading) return <Loading />;
	if (myVideosError) return <Error />;

	const conditionalRender = () => {
		if (myVideosData?.myVideos) {
			const { videos, message, success } = myVideosData.myVideos;

			if (success && videos) {
				return( 
					<div className="grid grid-cols-5 gap-2.5">
						{videos.map(video => (
							<div key={video.id}>
								<div className="bg-black-background flex items-center justify-center">
									<video src={video.url} controls className="h-40" />
								</div>
								<div>
									<h2 className="text-base font-bold">{video.title}</h2>
									<h3 className="text-sm">Posted By: {video.postedBy.username}</h3>
									<h4 className="text-xs">{video.createdAt.split(",")[0]}</h4>
								</div>
							</div>
						))}
					</div>
				);
			} else {
				return(
					<div className="no-videos flex justify-center items-center">
						<h1 className="text-2xl">
							{message}
						</h1>
					</div>
				);
			}
		}
	}

	return(
		<div className="z-0">
			{conditionalRender()}
		</div>
	);
}
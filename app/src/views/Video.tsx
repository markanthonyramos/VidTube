import { FC } from "react";
import { useParams } from "react-router";
import { VideoComments } from "../components/VideoComments";
import { VideoPlaying } from "../components/VideoPlaying";
import { VideoRecommended } from "../components/VideoRecommended";

export const Video: FC = () => {
	const { videoId }: any = useParams();
	
	return(
		<div className="m-2.5 flex">
			<VideoPlaying videoId={videoId} />
			<div className="w-2/4">
				<VideoRecommended videoId={videoId} />
				<VideoComments videoId={videoId} />
			</div>
		</div>
	);
}
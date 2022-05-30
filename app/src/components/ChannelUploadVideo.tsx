import { gql, useMutation } from "@apollo/client";
import { FC, SyntheticEvent, useState } from "react";
import { useAccessToken } from "../contexts/AccessTokenContext";
import { useUpdateMessage } from "../contexts/MessageContext";
import { useUpdateSuccess } from "../contexts/SuccessContext";
import { UPLOAD_VIDEO } from "../graphql/mutation/UPLOAD_VIDEO";
import { IUploadVideo } from "../types";
import { Error } from "./Error";
import { Loading } from "./Loading";

export const ChannelUploadVideo: FC = () => {
	const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
	const [isVideoValid, setIsVideoValid] = useState(true);
	const [videoFileName, setVideoFilename] = useState("");

	const accessToken = useAccessToken();

	const updateMessage: Function = useUpdateMessage();
	const updateSuccess: Function = useUpdateSuccess();
	
	const [uploadVideoFunc, { 
		loading: uploadVideoLoading,
		error: uploadVideoError,
	}] = useMutation<IUploadVideo>(UPLOAD_VIDEO, {
		onCompleted: ({ uploadVideo }) => {
			updateMessage(uploadVideo.message);
			updateSuccess(uploadVideo.success);
		},
		refetchQueries: [{
			query: gql`
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
						}
						message
						success
					}
				}
			`,
			context: {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		}]
	});

	if (uploadVideoLoading) return <Loading />;
	if (uploadVideoError) return <Error />;

	const handlers = {
		submit: async (e: SyntheticEvent<HTMLFormElement>) => {
			e.preventDefault();

			const { video, title, description }: any = Object.fromEntries(new FormData(e.currentTarget));

			try {
				await uploadVideoFunc({
					variables: {
						input: {
							video,
							title,
							description
						}
					},
					context: {
						headers: {
							Authorization: `Bearer ${accessToken}`
						}
					}
				});

				setIsVideoValid(true);
				setSelectedVideoUrl("");
				setVideoFilename("");
			} catch (err) {
				console.error(err);
			}
		},
		selectVideo: (e: SyntheticEvent<HTMLInputElement>) => {
			const video = e.currentTarget.files && e.currentTarget.files[0];
			const videoType = video?.type.split("/")[0];
			
			if (videoType === "video") {
				setIsVideoValid(true);
				setSelectedVideoUrl(URL.createObjectURL(video));
				video && setVideoFilename(video?.name);
			} else {
				setIsVideoValid(false);
				setSelectedVideoUrl("");
				setVideoFilename("");
			}
		}
	}

	return(
		<div className="flex justify-evenly">
			<form onSubmit={handlers.submit} className="mr-2.5 w-1/4">
				<label className="bg-primary text-white-text py-2 px-5 block text-center rounded-full cursor-pointer relative">
					Add a video
					<input required type="file" name="video" accept="video/*" onChange={handlers.selectVideo} className="opacity-0 pointer-events-none absolute left-0" />
				</label>
				<p className="my-2.5">Filename: {videoFileName ? videoFileName : "No file chosen"}</p>
				<input required type="text" name="title" placeholder="Title" className="w-full border border-default-border-color px-2.5 py-1.5 focus:outline-none focus:border-primary" /><br />
				<textarea required rows={14} name="description" placeholder="Description" className="description-input border border-default-border-color px-2.5 py-1.5 my-2.5 w-full focus:outline-none focus:border-primary" /><br />
				<button type="submit" className="bg-primary text-white-text w-full py-1.5 px-2.5">Submit</button>
			</form>
			<div className="w-full border border-default-border-color flex justify-center items-center">
				{ selectedVideoUrl ? <video src={selectedVideoUrl} /> : <p>{ isVideoValid ? "Your thumbnail will be displayed here." : "Please select a valid video type." }</p> }
			</div>
		</div>
	);
}
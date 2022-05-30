import { FC, useState } from "react";
import { ChannelUploadVideo } from "../components/ChannelUploadVideo";
import { ChannelUserVideos } from "../components/ChannelUserVideos";

export const Channel: FC = () => {
	const [activeTab, setActiveTab] = useState("");
	
	const UserVideosComponent = {
		liName: "Videos",
		component: <ChannelUserVideos />
	}

	const UploadVideoComponent = {
		liName: "Upload",
		component: <ChannelUploadVideo />
	}

	const displayActiveTab = () => {
		switch (activeTab) {
			case UserVideosComponent.liName:
				return UserVideosComponent.component;
			case UploadVideoComponent.liName:
				return UploadVideoComponent.component;
			default:
				setActiveTab(UserVideosComponent.liName);
				return UserVideosComponent.component;
		}
	}

	const liTagsStyles = "px-5 py-2.5 cursor-pointer hover:bg-white-background";

	const setActiveClassname = (componentName: any) => {
		return componentName.liName === activeTab ? `bg-white-background ${liTagsStyles}` : liTagsStyles;
	}

	return (
		<div className="m-2.5 flex">
			<div>
				<ul>
					<li onClick={e => setActiveTab(e.currentTarget.innerText)} className={setActiveClassname(UserVideosComponent)}>Videos</li>
					<li onClick={e => setActiveTab(e.currentTarget.innerText)} className={setActiveClassname(UploadVideoComponent)}>Upload</li>
				</ul>
			</div>
			<div className="bg-white-background w-full p-5">
				{displayActiveTab()}
			</div>
		</div>
	);
}

export default Channel;
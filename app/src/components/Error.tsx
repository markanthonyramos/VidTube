import { FC } from "react";

export const Error: FC = () => {
	return (
		<div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white-background p-10">
			<h2 className="text-2xl">An error occured please try again later.</h2>
		</div>
	);
}
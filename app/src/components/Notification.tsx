import { FC } from "react";
import { useMessage, useUpdateMessage } from "../contexts/MessageContext";
import { useUpdateSuccess } from "../contexts/SuccessContext";
import { Message } from "./Message"

export const Notification: FC = () => {
	const notification = document.querySelector<HTMLElement>("#notification");

	const message = useMessage();

	const updateMessage = useUpdateMessage();
	const updateSuccess = useUpdateSuccess();

	const notificationStyle = "fixed -bottom-20 left-2.5";
	
	if (message && notification) {
		notification.style.transition = "all 300ms ease-in-out";
		notification.style.transform = "translateY(-5.625rem)";

		setTimeout(() => {
			notification.style.transform = "translateY(5.625rem)";

			setTimeout(() => {
				updateMessage("");
				updateSuccess(false);
			}, 100);
		}, 2500);
	}

	return(
		<div id="notification" className={notificationStyle}>
			<Message />
		</div>
	);
}
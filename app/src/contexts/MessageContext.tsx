import { Context, createContext, FC, useContext, useState } from "react";

const MessageContext: Context<string> = createContext("");
const UpdateMessageContext: Context<Function> = createContext<Function>(() => {});

export const useMessage: Function = (): string => useContext(MessageContext);
export const useUpdateMessage: Function = (): Function => useContext(UpdateMessageContext);

export const MessageProvider: FC = ({ children }) => {
	const [message, setMessage] = useState("");

	return(
		<MessageContext.Provider value={message}>
			<UpdateMessageContext.Provider value={setMessage}>
				{ children }
			</UpdateMessageContext.Provider>
		</MessageContext.Provider>
	);
}
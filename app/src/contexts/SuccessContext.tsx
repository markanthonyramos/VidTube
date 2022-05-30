import { Context, createContext, FC, useContext, useState } from "react";

const SuccessContext: Context<boolean> = createContext<boolean>(false);
const UpdateSuccessContext: Context<Function> = createContext<Function>(() => {});

export const useSuccess: Function = (): boolean => useContext(SuccessContext);
export const useUpdateSuccess: Function = (): Function => useContext(UpdateSuccessContext);

export const SuccessProvider: FC = ({ children }) => {
	const [Success, setSuccess] = useState(false);

	return(
		<SuccessContext.Provider value={Success}>
			<UpdateSuccessContext.Provider value={setSuccess}>
				{ children }
			</UpdateSuccessContext.Provider>
		</SuccessContext.Provider>
	);
}
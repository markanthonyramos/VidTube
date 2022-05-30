import { Context, createContext, FC, useContext, useState } from "react";

const UserContext: Context<string> = createContext("");
const UpdateUserContext: Context<Function> = createContext<Function>(() => {});

export const useUser: Function = (): string => useContext(UserContext);
export const useUpdateUser: Function = (): Function => useContext(UpdateUserContext);

export const UserProvider: FC = ({ children }) => {
	const [user, setUser] = useState("");
	
	return (
		<UserContext.Provider value={user}>
			<UpdateUserContext.Provider value={setUser}>
				{ children }
			</UpdateUserContext.Provider>
		</UserContext.Provider>
	);
};
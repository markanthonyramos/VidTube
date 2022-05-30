import { useMutation } from "@apollo/client";
import { Context, createContext, FC, useContext, useState } from "react";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { REFRESH_TOKEN } from "../graphql/mutation/REFRESH_TOKEN";
import { IRefreshToken } from "../types";

const AccessTokenContext: Context<string> = createContext("");
const UpdateAccessTokenContext: Context<Function> = createContext<Function>(() => {});

export const useAccessToken: Function = (): string => useContext(AccessTokenContext);
export const useUpdateAccessToken: Function = (): Function => useContext(UpdateAccessTokenContext);

export const AccessTokenProvider: FC = ({ children }) => {
	const [accessToken, setAccessToken] = useState("");

	const [refreshToken, { 
		loading: refreshTokenLoading, 
		error: refreshTokenError 
	}] = useMutation<IRefreshToken>(REFRESH_TOKEN, {
		onCompleted: ({ refreshToken }) => {
			if (refreshToken.accessToken) {
				updateAccessToken(refreshToken.accessToken);
			}
		}
	});

	let refreshAccessToken: any;

	const updateAccessToken = (accessTokenParam: string) => {
		clearTimeout(refreshAccessToken);

		refreshAccessToken = setTimeout(async () => {
			await refreshToken();
		}, 1000 * 60 * 15);
		
		setAccessToken(accessTokenParam);
	}

	if (refreshTokenLoading) return <Loading />;
	if (refreshTokenError) return <Error />;

	return(
		<AccessTokenContext.Provider value={accessToken}>
			<UpdateAccessTokenContext.Provider value={updateAccessToken}>
				{ children }
			</UpdateAccessTokenContext.Provider>
		</AccessTokenContext.Provider>
	);
}
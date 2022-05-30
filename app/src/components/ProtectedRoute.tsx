import { useMutation } from "@apollo/client";
import { FC, useEffect } from "react"
import { Route, useHistory } from "react-router";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { useUpdateAccessToken } from "../contexts/AccessTokenContext";
import { useUpdateUser } from "../contexts/UserContext";
import { REFRESH_TOKEN } from "../graphql/mutation/REFRESH_TOKEN";
import { IRefreshToken } from "../types";

type Props = {
	component: FC
	exact: boolean
	path: string
}

export const ProtectedRoute: FC<Props> = ({ exact, path, component: Component, ...rest }) => {
	const history = useHistory();

	const updateAccessToken: Function = useUpdateAccessToken();
	const updateUser: Function = useUpdateUser();

	const [refreshTokenFunc, { 
		loading: refreshTokenLoading, 
		error: refreshTokenError,
	}] = useMutation<IRefreshToken>(REFRESH_TOKEN, {
		onCompleted: ({ refreshToken }) => {
			if (refreshToken.username && refreshToken.accessToken && refreshToken.success) {
				updateAccessToken(refreshToken.accessToken);
				updateUser(refreshToken.username);
				if (path === "/login" || path === "/register") {
					return history.replace("/");
				}
			} else if (!refreshToken.username && !refreshToken.accessToken && !refreshToken.success) {
				if (path !== "/login") {
					if (path !== "/register") {
						return history.replace("/login");
					}
				}
			}
		}
	});

	useEffect(() => {
		refreshTokenFunc().catch(err => console.error(err));
	}, [refreshTokenFunc]);

	if (refreshTokenLoading) return <Loading />;
	if (refreshTokenError) return <Error />;

	return(
		<Route exact={exact} path={path} render={props => {
			return <Component {...rest} {...props} />;
		}} />
	);
}
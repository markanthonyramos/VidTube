import { useApolloClient, useMutation } from '@apollo/client';
import { FC, useEffect } from 'react';
import { useUpdateAccessToken } from '../contexts/AccessTokenContext';
import { useUpdateSuccess } from '../contexts/SuccessContext';
import { useUpdateMessage } from '../contexts/MessageContext';
import { useUpdateUser } from '../contexts/UserContext';
import { LOGOUT } from '../graphql/mutation/LOGOUT';
import { ILogout } from '../types';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { useHistory } from 'react-router';

export const Logout: FC = () => {
	const history = useHistory();

	const client = useApolloClient();

	const updateAccessToken: Function = useUpdateAccessToken();
	const updateMessage: Function = useUpdateMessage();
	const updateError: Function = useUpdateSuccess();
	const updateUser: Function = useUpdateUser();

	const [logoutFunc, { loading: logoutLoading, error: logoutError }] = useMutation<ILogout>(LOGOUT, {
		onCompleted: async ({ logout }) => {
			if (logout.success) {
				updateAccessToken("");
				updateMessage(logout.message);
				updateError(logout.success);
				updateUser("");

				await client.clearStore();

				return history.push("/login");
			}
		},
	});
	
	useEffect(() => {
		logoutFunc().catch(err => console.error(err));
	}, [logoutFunc]);

	if (logoutLoading) return <Loading />;
	if (logoutError) return <Error />;

	return <></>;
};
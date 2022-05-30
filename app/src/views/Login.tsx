import { useMutation } from "@apollo/client";
import { FC, SyntheticEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import img from "../assets/digital-landscape.jpg";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { useUpdateAccessToken } from "../contexts/AccessTokenContext";
import { ILogin } from "../types";
import { LOGIN } from "../graphql/mutation/LOGIN";
import { useUpdateMessage } from "../contexts/MessageContext";
import { useUpdateSuccess } from "../contexts/SuccessContext";
import { useUpdateUser } from "../contexts/UserContext";

export const Login: FC = () => {
	const history = useHistory();

	const updateAccessToken: Function = useUpdateAccessToken();
	const updateMessage: Function = useUpdateMessage();
	const updateSuccess: Function = useUpdateSuccess();
	const updateUser: Function = useUpdateUser();

	const [loginFunc, { 
		loading: loginLoading, 
		error: loginError, 
	}] = useMutation<ILogin>(LOGIN, {
		onCompleted: ({ login }) => {
			updateMessage(login.message);
			updateSuccess(login.success);
			
			if (login.success && login.accessToken && login.username) {
				localStorage.setItem("access_token", login.accessToken);
				updateAccessToken(login.accessToken);
				updateUser(login.username);
				
				return history.replace("/");
			}
		}
	});

	if (loginLoading) return <Loading />;
	if (loginError) return <Error />;

	const handlers = {
		submit: async (e: SyntheticEvent<HTMLFormElement>) => {
			e.preventDefault();
			
			const { username, password }: any = Object.fromEntries(new FormData(e.currentTarget));

			try {
				await loginFunc({
					variables: {
						input: {
							username,
							password
						}
					}
				});				
			} catch (err) {
				console.error(err);
			}
		}
	}

	return (
		<div>
			<div className="login-img-wrapper">
				<img src={img} alt="Digital Landscape" className="w-full h-full object-fill" />
			</div>
			<form onSubmit={handlers.submit} className="absolute transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 bg-white-background w-1/4">
				<input required type="text" placeholder="Username" name="username" className="w-full mb-2.5 border border-solid border-default-border-color px-2.5 py-1.5 focus:border-primary outline-none" /><br />
				<input required type="text" placeholder="Password" name="password" className="w-full mb-2.5 border border-solid border-default-border-color px-2.5 py-1.5 focus:border-primary outline-none" /><br />
				<button type="submit" className="bg-primary text-white-text font-bold w-full p-1.5">Log In</button>
				<p className="text-center mt-2.5 underline text-blue-600"><Link to="/register">Don't have an account yet?</Link></p>
			</form>
		</div>
	);
}
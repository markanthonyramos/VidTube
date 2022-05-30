import { Link, useHistory } from "react-router-dom";
import img from "../assets/digital-landscape.jpg";
import { FC, SyntheticEvent } from "react";
import { useMutation } from "@apollo/client";
import { ICreateUser } from "../types";
import { CREATE_USER } from "../graphql/mutation/CREATE_USER";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { useUpdateMessage } from "../contexts/MessageContext";
import { useUpdateSuccess } from "../contexts/SuccessContext";

export const Register: FC = () => {
	const history = useHistory();
	
	const updateMessage: Function = useUpdateMessage();
	const updateSuccess: Function = useUpdateSuccess();

	const [createUserFunc, { 
		loading: createUserLoading, 
		error: createUserError
	}] = useMutation<ICreateUser>(CREATE_USER, {
		onCompleted: ({ createUser }) => {
			updateMessage(createUser.message);
			updateSuccess(createUser.success);

			if (createUser.success) {
				return history.replace("/login");
			}
		}
	});

	if (createUserLoading) return <Loading />;
	if (createUserError) return <Error />;

	const handlers = {
		submit: async (e: SyntheticEvent<HTMLFormElement>) => {
			e.preventDefault();

			const { username, password }: any = Object.fromEntries(new FormData(e.currentTarget));

			try {
				await createUserFunc({
					variables: {
						input: {
							username,
							password
						},
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
				<button type="submit" className="bg-primary text-white-text font-bold w-full p-1.5">Register</button>
				<p className="text-center mt-2.5 underline text-blue-600"><Link to="/login">Already have an account?</Link></p>
			</form>
		</div>
	);
}
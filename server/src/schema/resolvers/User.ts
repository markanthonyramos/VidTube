import { hash } from "bcrypt";
import { IResolvers } from "graphql-tools";
import { User } from "../../models/User";
import { IMessageSuccess, IUserInput, IUserSchema } from "../../types";
import { createDateTime } from "../../utils/createDateTime";

const hashPassword = async (password: string) => {
	const saltRounds: number = 5;
	return await hash(password, saltRounds).catch(err => console.error(err));
}

export const UserResolvers: IResolvers = {
	Query: {
		users: async () => {
			return await User.find().exec().catch(err => console.error(err));
		},
		userById: async (_: void, { id }) => {
			return await User.findById(id).exec().catch(err => console.error(err));
		}
	},
	Mutation: {
		createUser: async (_: void, { input }: IUserInput): Promise<IMessageSuccess> => {
			const passwordHashed = await hashPassword(input.password).catch(err => console.error(err));
		
			const user = await User
			.create({
				username: input.username,
				password: passwordHashed,
				createdAt: createDateTime()
			})
			.catch(err => {
				console.error(err);
				return false;
			});

			if (typeof user === "object") {
				if (user.id && user.username) {
					return {
						message: "User has been created.",
						success: true,
					}
				}
			} else if (!user) {
				return {
					message: "An error occured while querying on database.",
					success: false,
				}
			}

			return {
				message: "An error occured please try again.",
				success: false
			}
		},
		updateUser: async (_: void, { userId, input }: IUserInput): Promise<IMessageSuccess> => {
			if (input.username || input.password) {
				if (input.username && !input.password) {
						await User
						.findByIdAndUpdate(userId, {
							username: input.username,
						})
						.exec()
						.then(() => ({
							message: "Your username has been updated.",
							success: true
						}))
						.catch(err => console.error(err));
				} else if (!input.username && input.password) {
					const passwordHashed = await hashPassword(input.password).catch(err => console.error(err));
					
					if (passwordHashed) {
						await User
						.findByIdAndUpdate(userId, {
							password: passwordHashed
						})
						.exec()
						.then(() => ({
							message: "Your password has been updated.",
							success: true
						}))
						.catch(err => console.error(err));
					}
				} else if (input.username && input.password) {
					const passwordHashed = await hashPassword(input.password).catch(err => console.error(err));

					if (passwordHashed) {
						await User
						.findByIdAndUpdate(userId, {
							username: input.username,
							password: passwordHashed
						})
						.exec()
						.then(() => ({
							message: "Your username and password has been updated.",
							success: true
						}))
						.catch(err => console.error(err));
					}
				}
			} else if (!input.username && !input.password) {
				return {
					message: "Please fill out atleast one field.",
					success: false
				}
			}

			return {
				message: "An error occured please try again.",
				success: false
			}
		},
		deleteUser: async (_: void, { userId }: IUserInput): Promise<IMessageSuccess> => {
			if (userId) {
				await User
				.findByIdAndDelete(userId)
				.exec()
				.then(() => ({
					message: "Your account has been deleted.",
					success: true
				}))
				.catch(err => console.error(err));
			} else if (!userId) {
				return {
					message: "No id sent or found from the request",
					success: false
				}
			}

			return {
				message: "An error occured please try again.",
				success: false
			}
		}
	}
}
import { User } from "../../models/User";
import { IExpressContext, IAuthenticateResult, IUserInput, IMessageSuccess, IToken } from "../../types";
import { IResolvers } from "graphql-tools";
import { generateAccessToken } from "../../utils/generateAccessToken";
import { comparePasswords } from "../../utils/comparePasswords";
import { generateRefreshToken } from "../../utils/generateRefreshToken";
import { verifyJwt } from "../../utils/verifyJwt";

require("dotenv").config();

export const AuthenticateResolvers: IResolvers = {
	Mutation: {
		refreshToken: async (_: void, args: void, { req, res }: IExpressContext): Promise<IAuthenticateResult> => {
			const refreshToken: string = req.cookies.refresh_token;
			
			if (refreshToken) {
				const jwt: IToken = verifyJwt(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY || "");
			
				if (jwt.id) {
					const user = await User.findById(jwt.id).exec().catch(err => console.error(err));

					if (user) {
						const { _id: id, username } = user.toJSON();
						
						const accessToken = generateAccessToken(id, username);

						return {
							message: "Access token has been refreshed",
							accessToken,
							success: true,
							username
						}
					} else if (!user) {
						return {
							message: "Invalid payload.",
							success: false
						}
					}
				} else if (!jwt.id) {
					return {
						message: "Invalid access token.",
						success: false
					}
				}
			} else if (!refreshToken) {
				return {
					message: "Refresh token not found.",
					success: false
				}
			}

			return {
				message: "An error occured please try again.",
				success: false
			}
		},
		login: async (_: void, { input }: IUserInput, { req, res }: IExpressContext): Promise<IAuthenticateResult> => {
			const user = await User.findOne({ username: input.username }).exec().catch(err => console.error(err));
			
			if (user) {
				const { _id: id, username, password } = user.toJSON();
				
				const isPasswordMatch = await comparePasswords(input.password, password).catch(err => console.error(err));
			
				if (isPasswordMatch) {
					const accessToken = generateAccessToken(id, username);
					const refreshToken = generateRefreshToken(id);

					res.cookie("refresh_token", refreshToken, {
						maxAge: 1000 * 60 * 60 * 24,
						httpOnly: true,
					});
					
					return {
						message: "You are now logged in.",
						accessToken,
						success: true,
						username
					}
				}	else if (!isPasswordMatch) {
					return {
						message: "Wrong password specified.",
						success: false
					}
				}
			} else if (!user) {
				return {
					message: "User doesn't exist.",
					success: false
				}
			}

			return {
				message: "An error occured please try again.",
				success: false
			}
		},
		logout: (_: void, args: void, { req, res }: IExpressContext): IMessageSuccess => {
			res.clearCookie("refresh_token");
			
			return {
				message: "You are now logged out.",
				success: true
			}
		}
	}
}
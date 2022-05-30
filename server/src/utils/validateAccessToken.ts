import { Request } from "express";
import { User } from "../models/User";
import { IAccessTokenValid, IToken } from "../types";
import { verifyJwt } from "./verifyJwt";

export const validateAccessToken = async (req: Request) => {
	const accessToken = req.headers.authorization?.split("Bearer ")[1];
	
	if (accessToken) {
		const jwt: IToken = verifyJwt(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY || "");

		if (jwt.id && jwt.username) {
			const user = await User.findById(jwt.id).exec().catch(err => console.error(err));
			
			if (user) {
				return {
					message: "Valid access token.",
					success: true,
					user
				}
			} else if (!user) {
				return {
					message: "Invalid payload.",
					success: false
				}
			}
		} else {
			return {
				message: "Invalid access token.",
				success: false
			}
		}
	} else if (!accessToken) {
		return {
			message: "Access token not found.",
			success: false
		}
	}

	return {
		message: "An error occured please try again.",
		success: false
	}
}
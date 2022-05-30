import { sign } from "jsonwebtoken";

require("dotenv").config();

export const generateRefreshToken = (id: string): string => {
	return sign(
		{ id }, 
		process.env.REFRESH_TOKEN_SECRET_KEY || "", 
		{ expiresIn: "1d" }
	);
}
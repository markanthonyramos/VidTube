import { sign } from "jsonwebtoken";

require("dotenv").config();

export const generateAccessToken = (id: string, username: string): string =>	{
	return sign(
		{ id, username }, 
		process.env.ACCESS_TOKEN_SECRET_KEY || "", 
		{ expiresIn: "1d" }
	);
}
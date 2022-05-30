import { verify } from "jsonwebtoken";

export const verifyJwt = (token: string, secret: string): any => {
	return verify(token, secret);
}
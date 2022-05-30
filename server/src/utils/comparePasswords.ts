import { compare } from "bcrypt";

export const comparePasswords = async (password: string, passwordHashed: string): Promise<boolean> => {
	return await compare(password, passwordHashed).catch(err => {
		console.error(err);
		return false;
	});	
}
export const deconstructAsyncAwait = async (pr: Promise<any>): Promise<[any, any]> => {
	try {
		const data = await pr;
		return [data, null];
	} catch (err) {
		return [null, err];
	}
} 
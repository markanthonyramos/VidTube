export const createDateTime = () => {
	const date = new Date().toISOString().split("T")[0];
	const time = new Date().toTimeString().split(" (")[0];
	return `${date}, ${time}`;
}
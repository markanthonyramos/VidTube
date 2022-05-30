import { FC } from 'react'
import { useSuccess } from '../contexts/SuccessContext';
import { useMessage } from '../contexts/MessageContext';

export const Message: FC = () => {
	const message: string = useMessage();
	const success: boolean = useSuccess();

	const baseStyle = "p-2.5 px-5 text-center border-2 font-bold flex justify-evenly items-center";

	const errorStyle: string = `${baseStyle} border-red-600 bg-red-400`;
	const successStyle: string = `${baseStyle} border-green-600 bg-green-400`;

	return (
		<p className={message && (success ? successStyle : errorStyle)}>
			{message}
		</p>
	);
}
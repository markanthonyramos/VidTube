import { FC } from 'react';
import { useAccessToken } from '../contexts/AccessTokenContext';
import { NavbarDropdown } from './NavbarDropdown';

export const Navbar: FC = () => {
	const accessToken: string = useAccessToken();

	return (
		<nav className="flex justify-between items-center px-20 py-3 bg-white-background">
			<h1 className="text-3xl">VidTube</h1>
			{accessToken && <NavbarDropdown />}
		</nav>
	);
}
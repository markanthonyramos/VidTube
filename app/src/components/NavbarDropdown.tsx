import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export const NavbarDropdown: FC = () => {
	const user: string = useUser();
	const [isDropDown, setIsDropDown] = useState(false);

	const dropDownLiTagStyles = "hover:bg-body-background cursor-pointer";

	return (
		<div className="relative flex items-center">
			<div>
				<h2 className="mr-2.5">{user}</h2>
			</div>
			<div onClick={() => setIsDropDown(!isDropDown)} className="border border-primary rounded-full w-9 h-9 px-2 py-2 group hover:bg-primary cursor-pointer">
				<svg 
					aria-hidden="true" 
					focusable="false" 
					data-prefix="fas" 
					data-icon="user" 
					className="svg-inline--fa fa-user fa-w-14 w-full h-full text-primary group-hover:text-white-text" 
					role="img" 
					xmlns="http://www.w3.org/2000/svg" 
					viewBox="0 0 448 512">
						<path 
							fill="currentColor" 
							d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
						</path>
				</svg>
			</div>
			{isDropDown &&
			<ul onMouseLeave={() => setIsDropDown(!isDropDown)} className="absolute right-0 top-full mt-2.5 bg-white-background border border-default-border-color w-48 z-50">
				<li className={dropDownLiTagStyles}><Link to="/" className="pl-2.5 py-1.5 block">Home</Link></li>
				<li className={dropDownLiTagStyles}><Link to="/channel" className="pl-2.5 py-1.5 block">Channel</Link></li>
				<li className={dropDownLiTagStyles}><Link to="/logout" className="pl-2.5 py-1.5 block">Logout</Link></li>
			</ul>}
		</div>
	);
};
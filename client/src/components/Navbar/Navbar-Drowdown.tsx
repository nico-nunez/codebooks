import React, { ReactElement } from 'react';

export interface NavbarDropdownProps {
	title: string;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ title, children }) => {
	const dropdownItems = React.Children.map(children, (child) => {
		return React.cloneElement(child as ReactElement, {
			className: 'navbar-item',
		});
	});
	return (
		<div className="navbar-item has-dropdown is-hoverable">
			<span className="navbar-link">{title}</span>
			<div className="navbar-dropdown">{dropdownItems}</div>
		</div>
	);
};

export default NavbarDropdown;

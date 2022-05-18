import { User } from '../../state';
import NavbarDropdown from './Navbar-Drowdown';

interface UserMenuProps {
	onLinkClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
	onLogoutClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
	currentUser: User;
}

const UserMenu: React.FC<UserMenuProps> = ({
	onLinkClick,
	onLogoutClick,
	currentUser,
}) => {
	return (
		<NavbarDropdown title={currentUser.profile_name}>
			<a href={`/users/${currentUser.id}`} onClick={onLinkClick}>
				Profile
			</a>
			<a href={`/users/${currentUser.id}/pages`} onClick={onLinkClick}>
				My Book
			</a>
			<span
				style={{
					borderBottom: '1px solid rgba(200,200,200,0.2)',
					marginBottom: '5px',
				}}
			></span>
			<a href="/" onClick={onLogoutClick}>
				Logout
			</a>
		</NavbarDropdown>
	);
};

export default UserMenu;

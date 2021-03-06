import './Navbar.css';
import {
	useTypedSelector,
	useNewPage,
	useToggle,
	useBlockNav,
	useActions,
} from '../../hooks';
import UserMenu from './UserMenu';
import { BASE_URL } from '../../utils';
import RecentPages from './RecentPages';
import DiscardModal from '../Modals/DiscardModal';
import AuthModal from '../Modals/AuthModal/AuthModal';

const Navbar = () => {
	const newPage = useNewPage();
	const { authClearErrors } = useActions();
	const auth = useTypedSelector(({ auth }) => auth);
	const [showAuthModal, setShowAuthModal] = useToggle();
	const { blockNav, showBlockModal, toggleBlockModal } = useBlockNav();

	// NAV LINK BLOCKING
	const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		blockNav(e);
	};

	// USER LOGOUT
	const onLogoutClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		blockNav(e, () => () => {
			window.open(`${BASE_URL}/api/auth/logout`, '_self');
		});
	};

	// RENDER NAV LINKS BASED ON LOGIN STATUS
	const renderNavLinks = () => {
		return auth.isAuthenticated && auth.user ? (
			<>
				<RecentPages onLinkClick={onLinkClick} />
				<UserMenu
					onLinkClick={onLinkClick}
					onLogoutClick={onLogoutClick}
					currentUser={auth.user}
				/>
			</>
		) : (
			<div className="buttons">
				<span
					onClick={() => setShowAuthModal(true)}
					className="button is-primary"
				>
					Login
				</span>
			</div>
		);
	};

	// NAVBAR
	return (
		<>
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<a
						href="/"
						className="navbar-item brand-name"
						onClick={(e) => {
							blockNav(e, () => newPage);
						}}
					>
						Codebooks
					</a>
				</div>
				<div className="navbar-menu">
					<div className="navbar-end">
						<div className="navbar-item">
							{!auth.loading && renderNavLinks()}
						</div>
					</div>
				</div>
			</nav>
			{(showAuthModal || auth.errors) && (
				<AuthModal
					active={showAuthModal}
					errors={auth.errors}
					onCancel={() => {
						setShowAuthModal(false);
						authClearErrors();
					}}
				/>
			)}
			{showBlockModal && (
				<DiscardModal
					active={showBlockModal}
					onConfirmClick={() => blockNav(null)}
					onCancelClick={() => toggleBlockModal(false)}
				/>
			)}
		</>
	);
};

export default Navbar;

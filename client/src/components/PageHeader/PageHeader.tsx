import './PageHeader.css';
import PageName from './PageName';
import HeaderButton from './PageHeaderBtn';
import DiscardModal from '../Modals/DiscardModal';
import DeleteModal from '../Modals/DeleteModal';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	useActions,
	useToggle,
	useNewPage,
	useCurrentPage,
	useTypedSelector,
} from '../../hooks';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';
import AuthModal from '../Modals/AuthModal/AuthModal';

interface PageHeaderProps {
	page_name: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ page_name }) => {
	const { pathname } = useLocation();
	const { savePage, deleteSavedPage, authClearErrors } = useActions();
	const [showAuthModal, setShowAuthModal] = useToggle();
	const [showDiscardModal, setShowDiscardModal] = useToggle();
	const [showDeleteModal, setShowDeleteModal] = useToggle();
	const isSaved = useTypedSelector(({ pages: { current } }) => current.saved);
	const loading = useTypedSelector(({ pages: { loading } }) => loading);
	const auth = useTypedSelector(({ auth }) => auth);
	const page = useCurrentPage();
	const newPage = useNewPage();
	const navigate = useNavigate();
	const isAuthor = auth.user && auth.user.id === page.user_id;

	const onDeletePage = () => {
		deleteSavedPage(page.id as number, navigate);
		setShowDeleteModal(false);
	};
	const onSaveClick = () => {
		if (!auth.isAuthenticated) {
			setShowAuthModal(true);
			return;
		} else {
			savePage(navigate);
			return;
		}
	};
	const onNewClick = () => {
		if (!isSaved) {
			setShowDiscardModal(true);
		} else {
			newPage();
			navigate('/');
		}
	};

	return (
		<>
			<ActionBarWrapper>
				<div className="ms-2 action-bar-start">
					{(pathname === '/' || isAuthor) && (
						<div className="action-bar-buttons">
							<HeaderButton
								className={loading ? 'is-loading' : ''}
								text={isAuthor ? 'Save' : 'Save As'}
								onClick={onSaveClick}
								disabled={isSaved}
							/>
							{isAuthor && (
								<HeaderButton
									text="Delete"
									onClick={() => setShowDeleteModal(true)}
									className={`is-danger delete-page-btn ${
										loading && 'is-loading'
									}`}
								/>
							)}
						</div>
					)}
				</div>
				<PageName page_name={page_name} />
				<div className="me-2 action-bar-end">
					<HeaderButton text="New" onClick={onNewClick} />
				</div>
			</ActionBarWrapper>
			{showDeleteModal && (
				<DeleteModal
					active={showDeleteModal}
					onConfirmClick={onDeletePage}
					onCancelClick={() => setShowDeleteModal(false)}
				/>
			)}
			{(showAuthModal || auth.errors) && (
				<AuthModal
					active={showAuthModal}
					errors={auth.errors}
					onCancel={() => {
						authClearErrors();
						setShowAuthModal(false);
					}}
				/>
			)}
			{showDiscardModal && (
				<DiscardModal
					active={showDiscardModal}
					onConfirmClick={() => {
						setShowDiscardModal(false);
						newPage();
					}}
					onCancelClick={() => setShowDiscardModal(false)}
				/>
			)}
		</>
	);
};

export default PageHeader;

import { Link } from 'react-router-dom';
import { useActions, useToggle } from '../../hooks';
import { SavedPage } from '../../state';
import DeleteModal from '../Modals/DeleteModal';

interface PageCardProps {
	page: SavedPage;
	author?: boolean;
}

const PageCard: React.FC<PageCardProps> = ({ page, author = true }) => {
	const { deleteSavedPage } = useActions();
	const [showModal, setShowModal] = useToggle();

	return (
		<div className="card">
			<div className="card-content">
				<div className="content">
					<div>
						<p className="title is-4">{page.page_name}</p>
						<p className="subtitle is-6">
							{author && `Author: ${page.author}`}
						</p>
					</div>
					<div className="pt-2 has-text-muted">
						<time dateTime="2016-1-1">
							Created: {new Date(page.created_at).toDateString() || ''}
						</time>
						<time dateTime="2016-1-1" className="is-block">
							Updated: {new Date(page.updated_at).toDateString() || ''}
						</time>
					</div>
				</div>
			</div>
			<footer className="card-footer">
				<Link to={`/pages/${page.id}`} className="card-footer-item">
					View
				</Link>
				<span
					className="card-footer-item is-clickable"
					onClick={() => setShowModal(true)}
					style={{ backgroundColor: '#d64742aa' }}
				>
					Delete
				</span>
			</footer>
			{showModal && (
				<DeleteModal
					active={showModal}
					onConfirmClick={() => deleteSavedPage(page.id)}
					onCancelClick={() => setShowModal(false)}
				/>
			)}
		</div>
	);
};

export default PageCard;

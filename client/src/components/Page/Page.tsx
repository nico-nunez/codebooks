import './Page.css';
import { CellTypes, Id } from '../../state';
import { shallowEqual } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTypedSelector, useActions, useCurrentPage } from '../../hooks';
import PageHeader from '../PageHeader/PageHeader';
import AddCell from '../Add-Cell/Add-Cell';
import CellItem from '../Cell/Cell';
import { updateSavedStatus } from '../../state/action-creators';

const Page: React.FC = () => {
	const { fetchFullPage, clearError, addRecent } = useActions();
	const order = useTypedSelector(({ cells }) => cells.order);
	const currentPage = useCurrentPage();
	const error = useTypedSelector(({ pages: { error } }) => error);
	const cellTypes = useTypedSelector(({ cells }) => {
		const types: { [key: Id]: CellTypes } = {};
		for (const id in cells.data) {
			types[id] = cells.data[id].cell_type;
		}
		return types;
	}, shallowEqual);
	const { pageId } = useParams();
	const navigate = useNavigate();
	let showCodeButton = true;
	let showTextButton = true;
	const renderedCells = order.map((cell_id) => {
		const cell_type = cellTypes[cell_id];
		if (cell_type === 'code') showCodeButton = false;
		if (cell_type === 'text') showTextButton = false;
		return (
			<Fragment key={cell_id}>
				<CellItem id={cell_id} />
			</Fragment>
		);
	});

	// HANDLE TOGGLE SAVE & DISMISS ERROR
	useEffect(() => {
		const handleDismissError = () => {
			clearError();
		};
		if (error) window.addEventListener('click', handleDismissError, true);
		return () => {
			window.removeEventListener('click', handleDismissError);
		};
	}, [error, clearError, navigate]);

	// FETCH PAGE ON LOAD
	useEffect(() => {
		const page_id = parseInt(pageId || '');
		if (page_id && page_id !== currentPage.id) {
			fetchFullPage(page_id, navigate);
			addRecent(page_id);
		}
		return () => {
			updateSavedStatus(true);
		};
	}, [pageId, currentPage, fetchFullPage, navigate, addRecent]);

	return (
		<>
			<PageHeader
				page_name={currentPage ? currentPage.page_name : 'Untitled'}
			/>
			<div className="cell-list">
				{error && <div className="error-messages">{error}</div>}
				{renderedCells}
				{(showCodeButton || showTextButton) && (
					<AddCell
						showCodeButton={showCodeButton}
						showTextButton={showTextButton}
					/>
				)}
			</div>
		</>
	);
};

export default Page;

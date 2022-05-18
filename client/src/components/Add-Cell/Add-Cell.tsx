import './Add-Cell.css';
import { useActions, useTypedSelector } from '../../hooks';

interface AddCellProps {
	showCodeButton: boolean;
	showTextButton: boolean;
}

const AddCell: React.FC<AddCellProps> = ({
	showCodeButton,
	showTextButton,
}) => {
	const { createCell, updateSavedStatus } = useActions();
	const page_id = useTypedSelector(({ pages: { current } }) => current.id);
	const onAddCodeCell = () => {
		createCell(page_id, 'code');
		updateSavedStatus(false);
	};
	const onAddTextCell = () => {
		createCell(page_id, 'text');
		updateSavedStatus(false);
	};
	return (
		<div className="add-cell-wrapper">
			<div className="add-cell-divider"></div>
			{showCodeButton && (
				<button className="button is-rounded" onClick={onAddCodeCell}>
					+ Code
				</button>
			)}
			{showTextButton && (
				<button className="button is-rounded" onClick={onAddTextCell}>
					+ Text
				</button>
			)}
		</div>
	);
};

export default AddCell;

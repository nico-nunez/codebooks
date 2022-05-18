import { Id } from '../../state';
import ActionButton from './Action-Button';
import DeleteModal from '../Modals/DeleteModal';
import { useActions, useToggle, useTypedSelector } from '../../hooks';

interface ActionBarControlsProps {
	id: Id;
}

const ActionBarControls: React.FC<ActionBarControlsProps> = ({ id }) => {
	const cell = useTypedSelector(({ cells }) => cells.data[id]);
	const { moveCell, deleteCell, updateSavedStatus } = useActions();
	const [showModal, setShowModal] = useToggle();

	const onMoveUp = () => {
		moveCell(id, 'up');
		updateSavedStatus(false);
	};

	const onMoveDown = () => {
		moveCell(id, 'down');
		updateSavedStatus(false);
	};

	const onDeleteCell = () => {
		deleteCell(cell);
	};

	return (
		<div className="action-bar-end">
			<ActionButton onClick={onMoveUp} icon="fa-arrow-up" />
			<ActionButton onClick={onMoveDown} icon="fa-arrow-down" />
			<ActionButton onClick={() => setShowModal(true)} icon="fa-trash-can" />
			{showModal && (
				<DeleteModal
					active={showModal}
					onConfirmClick={onDeleteCell}
					onCancelClick={() => setShowModal(false)}
				/>
			)}
		</div>
	);
};

export default ActionBarControls;

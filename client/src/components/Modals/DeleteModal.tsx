import Modal from './Modal/Modal';

interface DeleteModalProps {
	active: boolean;
	onConfirmClick: () => void;
	onCancelClick: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
	active,
	onCancelClick,
	onConfirmClick,
}) => {
	return (
		<Modal
			name="delete"
			active={active}
			title={'Delete Confirmation'}
			onCancel={() => onCancelClick()}
			onConfirm={() => onConfirmClick()}
			content={'Are you sure you want to continue to delete?'}
		/>
	);
};

export default DeleteModal;

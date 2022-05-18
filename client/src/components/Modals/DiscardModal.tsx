import Modal from './Modal/Modal';

interface SaveModalProps {
	active: boolean;
	onConfirmClick: () => void;
	onCancelClick: () => void;
}

const SaveModal: React.FC<SaveModalProps> = ({
	active,
	onCancelClick,
	onConfirmClick,
}) => {
	return (
		<Modal
			name="save"
			active={active}
			title={'Discard changes:'}
			onCancel={() => onCancelClick()}
			onConfirm={() => onConfirmClick()}
			content={'Are you sure you want to continue to without saving?'}
		/>
	);
};

export default SaveModal;

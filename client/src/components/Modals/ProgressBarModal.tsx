import Modal from './Modal/Modal';

const ProgressBarModal = () => {
	return (
		<Modal name="progressBar" title={null} cancelBtn={false} confirmBtn={false}>
			<div className="progress-cover" style={{ marginTop: '50%' }}>
				<progress className="progress is-primary" max="100">
					Loading...
				</progress>
			</div>
		</Modal>
	);
};

export default ProgressBarModal;

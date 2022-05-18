import Modal from './Modal/Modal';

const Alert = () => {
	return (
		<Modal
			name="alert"
			title="We're working on it :)"
			confirmBtn={false}
			content="Unfortunately this feature isn't quite ready. &nbsp; Please check back soon!"
		/>
	);
};

export default Alert;

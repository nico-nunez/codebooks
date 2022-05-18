type ModalHeaderProps = { onClick: () => void };

const ModalHeader: React.FC<ModalHeaderProps> = ({ onClick, children }) => {
	return (
		<header className="modal-card-head">
			{children}
			<button className="delete" aria-label="close" onClick={onClick}></button>
		</header>
	);
};

export default ModalHeader;

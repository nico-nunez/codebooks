import React from 'react';
import { createPortal } from 'react-dom';

// type HeaderProps = { title: string };

// export const ModalHeader: React.FC<HeaderProps> = ({ title }) => {
// 	return (
// 		<header className="modal-card-head">
// 			<div className="modal-card-title">{title}</div>
// 			<button className="delete" aria-label="close" onClick={onClick}></button>
// 		</header>
// 	);
// };

export const ModalBody: React.FC = ({ children }) => {
	return <section className="modal-card-body">{children}</section>;
};

export const ModalFooter: React.FC = ({ children }) => {
	return <footer className="modal-card-foot">{children}</footer>;
};

interface ModalProps {
	name: string;
	title: string | null;
	active?: boolean;
	content?: string;
	confirmBtn?: boolean;
	onConfirm?: () => void;
	cancelBtn?: boolean;
	onCancel?: () => void;
}

const Modal: React.FC<ModalProps> = ({
	name,
	title,
	active,
	content,
	confirmBtn = true,
	onConfirm,
	cancelBtn = true,
	onCancel,
	children,
}) => {
	const modalRoot = document.querySelector('#modal');
	const isActive = active;
	const renderFooter = () => {
		if (!confirmBtn && !cancelBtn) return;
		return (
			<footer
				className="modal-card-foot"
				style={{ display: 'flex', justifyContent: 'end' }}
			>
				{confirmBtn && (
					<button onClick={onConfirm} className="button cancel is-success">
						Confirm
					</button>
				)}
				{cancelBtn && (
					<button onClick={onCancel} className="button cancel is-danger">
						Cancel
					</button>
				)}
			</footer>
		);
	};
	if (modalRoot) {
		return createPortal(
			<div className={`modal ${isActive && 'is-active'}`}>
				<div className="modal-background" onClick={onCancel}></div>
				<div className="modal-card">
					{title && (
						<header className="modal-card-head">
							<p className="modal-card-title ">{title}</p>
							<button
								className="delete"
								aria-label="close"
								onClick={onCancel}
							></button>
						</header>
					)}
					{content && <section className="modal-card-body">{content}</section>}
					{children}
					{renderFooter()}
				</div>
			</div>,
			modalRoot
		);
	}
	return null;
};

export default Modal;

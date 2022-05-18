import './AuthModal.css';
import Login from './Login';
import Register from './Register';
import Modal, { ModalBody } from '../Modal/Modal';
import { useState } from 'react';
import { saveStore } from '../../../utils';
import { useTypedSelector } from '../../../hooks';

type ActiveFormState = 'login' | 'register';

interface AuthModalProps {
	active: boolean;
	onCancel: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ active, onCancel }) => {
	const [activeForm, setActiveForm] = useState<ActiveFormState>('login');
	const errors = useTypedSelector(({ auth }) => auth.errors);
	const onGoogleClick = () => {
		saveStore();
		window.open('http://localhost:8080/api/auth/google', '_self');
	};
	const onGithubClick = () => {
		saveStore();
		window.open('http://localhost:8080/api/auth/github', '_self');
	};
	const renderedErrors = errors?.map((err, i) => {
		return (
			<p className="is-danger" key={i}>
				{err}
			</p>
		);
	});
	return (
		<Modal
			active={active}
			name="login"
			title={'Please login to continue:'}
			confirmBtn={false}
			cancelBtn={false}
			onCancel={onCancel}
		>
			<ModalBody>
				<main className="card-body-container">
					<header className="card-body-header">
						<div
							className={`header-form-btn ${
								activeForm === 'login' && 'active-form'
							}`}
							onClick={() => setActiveForm('login')}
						>
							Login
						</div>
						<div
							className={`header-form-btn ${
								activeForm === 'register' && 'active-form'
							}`}
							onClick={() => setActiveForm('register')}
						>
							Register
						</div>
					</header>
					<section className="card-body-section">
						<div className="error-messages">{renderedErrors}</div>
						<div className="section-form">
							{activeForm === 'register' ? (
								<Register onClose={onCancel} />
							) : (
								<Login onClose={onCancel} />
							)}
							<button
								type="submit"
								form={activeForm}
								className="button is-primary btn-form-submit"
							>
								Submit
							</button>
						</div>
					</section>
					<div className="card-body-divider">
						<span>or</span>
					</div>
					<section className="card-body-section">
						<div className="section-social">
							<div className="social-btn-div">
								<div className="social-btn btn-google" onClick={onGoogleClick}>
									<i className="fa-brands fa-google"></i>
									<span className="btn-google">Google</span>
								</div>
							</div>
							<div className="social-btn-div">
								<div className="social-btn btn-github" onClick={onGithubClick}>
									<div className="fa-brands fa-github"></div>
									<span className="btn-github">Github</span>
								</div>
							</div>
						</div>
					</section>
				</main>
			</ModalBody>
		</Modal>
	);
};

export default AuthModal;

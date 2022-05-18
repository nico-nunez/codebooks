import { useActions } from '../../../hooks';
import Form from '../../Forms/Form';
import FormField from '../../Forms/FormField';

interface LoginInputs {
	email: string;
	password: string;
}

interface LoginProps {
	onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
	const { loginUser } = useActions();
	const onSubmitForm = (inputs: {}) => {
		loginUser({ ...(inputs as LoginInputs) });
		onClose();
	};
	return (
		<>
			<Form
				name="login"
				id="login"
				onSubmit={onSubmitForm}
				validationOptions={{ password: false }}
			>
				<FormField type="email" placeholder="Email" name="email" required />
				<FormField
					type="password"
					placeholder="Password"
					name="password"
					required
				/>
			</Form>
		</>
	);
};

export default Login;

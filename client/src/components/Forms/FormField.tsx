interface FormFieldProps {
	type: 'text' | 'email' | 'password';
	onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
	values?: { [key: string]: string };
	name: string;
	errMsg?: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
	label,
	type,
	name,
	placeholder,
	onChange,
	required,
	values,
	errMsg,
}) => {
	return (
		<div className="field">
			<label className="label">{label}</label>
			<div className="control has-icons-left has-icons-right">
				<input
					name={name}
					className={`input ${errMsg && 'is-danger'}`}
					type={type}
					placeholder={placeholder || ''}
					onChange={onChange}
					value={values ? values[name] : ''}
					required={required}
				/>
				{type === 'email' && (
					<span className="icon is-small is-left">
						<i className="fas fa-envelope"></i>
					</span>
				)}
				{type === 'password' && (
					<span className="icon is-small is-left">
						<i className="fas fa-key"></i>
					</span>
				)}
				{name === 'profile_name' && (
					<span className="icon is-small is-left">
						<i className="fas fa-user"></i>
					</span>
				)}
				{errMsg && (
					<span className="icon is-small is-right">
						<i className="fas fa-exclamation-triangle"></i>
					</span>
				)}
			</div>
			{errMsg && <p className="help is-danger">{errMsg}</p>}
		</div>
	);
};

export default FormField;

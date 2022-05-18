import React from 'react';
import { useState } from 'react';
import { validateForm, ValidationOptions } from '../../utils';

interface FormProps {
	id?: string;
	name?: string;
	onSubmit: (inputs: InputState) => void;
	validationOptions?: ValidationOptions;
}

type InputState = { [key: string]: string };
type ErrorState = InputState;

const Form: React.FC<FormProps> = ({
	id,
	name,
	onSubmit,
	validationOptions,
	children,
}) => {
	const [inputs, setInputs] = useState<InputState>({});
	const [errors, setErrors] = useState<ErrorState>({});
	const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = evt.target;
		const { value } = evt.target;
		setInputs({ ...inputs, [name]: value });
	};
	const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
		setErrors({});
		evt.preventDefault();
		const errs = validateForm(evt.currentTarget, validationOptions);
		if (errs.length) {
			const formErrors = {};
			errs.forEach((err) => {
				Object.assign(formErrors, err);
			});
			setErrors({ ...formErrors });
			return;
		}
		onSubmit(inputs);
		setInputs({});
	};
	return (
		<form onSubmit={onSubmitForm} name={name} id={id} noValidate>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					inputs[child.props.name] = inputs[child.props.name] || '';
					return React.cloneElement(child, {
						onChange,
						values: inputs,
						errMsg: errors[child.props.name],
					});
				}
				return child;
			})}
		</form>
	);
};

export default Form;

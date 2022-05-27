type ErrorMsg = { [key: string]: string };

export const validateForm = (
	form: HTMLFormElement,
	options: ValidationOptions | undefined
): ErrorMsg[] => {
	options = Object.assign(defaultOptions, options || {});
	const errors: ErrorMsg[] = [];
	const elems = Array.from(form.elements);
	elems.forEach((elem) => {
		if (elem.tagName === 'INPUT') {
			const err = validateInput(
				elem as HTMLInputElement,
				options as ValidationOptions
			);
			if (err) errors.push(err);
		}
	});
	return errors;
};

export interface ValidationOptions {
	email?: boolean;
	password?: boolean;
}

const defaultOptions: ValidationOptions = {
	email: true,
	password: true,
};

const validateInput = (
	elem: HTMLInputElement,
	options: ValidationOptions
): ErrorMsg | void => {
	const { name, value, required, type } = elem;
	if (required && !value) {
		return { [name]: `Required` };
	}
	if (type === 'email' && options.email) {
		const re = /\S+@\S+\.\S+/;
		const validEmail = re.test(value);
		if (!validEmail) return { [name]: 'Invalid email address' };
	}
	if (type === 'password' && options.password) {
		const re =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		const validPass = re.test(value);
		console.log(value, validPass);
		if (!validPass)
			return {
				[name]:
					'Password must contain at least: 8 characters, an uppercase, lowercase, number, and special character [!@$%&*?].',
			};
	}
	return;
};

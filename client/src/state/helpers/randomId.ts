type AlphaCase = 'upper' | 'lower' | 'mixed';
type IdType = 'alpha' | 'numeric' | 'alpha-numeric';

type Options = {
	length: number;
	type?: IdType;
	alphaCase?: AlphaCase;
};

const defaultOptions: Options = {
	length: 5,
	type: 'numeric',
	alphaCase: 'upper',
};

const randomInt = (max: number) => {
	return Math.floor(Math.random() * max);
};

const alphaId = (len: number, alphaCase: AlphaCase = 'upper') => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let isLowerCase = alphaCase === 'lower' ? true : false;
	let id = '';

	for (let i = 0; i < len; i++) {
		const randCase = Boolean(randomInt(2));
		let randChar = chars[randomInt(chars.length)];
		isLowerCase = alphaCase === 'mixed' ? randCase : isLowerCase;
		randChar = isLowerCase ? randChar.toLowerCase() : randChar;
		id += randChar;
	}
	return id;
};

const numericId = (len: number) => {
	const digits = '0123456789';
	let id = '';
	for (let i = 0; i < len; i++) {
		id += digits[randomInt(digits.length)];
	}
	return id;
};

const alphaNumId = (len: number, alphaCase: AlphaCase = 'upper') => {
	let id = '';
	for (let i = 0; i < len; i++) {
		const randChar = randomInt(2) ? alphaId(1, alphaCase) : numericId(1);
		id += randChar;
	}
	return id;
};

const generateId = (options: Options = defaultOptions) => {
	const { length, type, alphaCase } = options;
	const minLen = Math.max(1, length);
	const actualLength = Math.min(minLen, 2000);
	if (type === 'alpha') return alphaId(actualLength, alphaCase);
	if (type === 'numeric') return numericId(actualLength);
	if (type === 'alpha-numeric') return alphaNumId(actualLength, alphaCase);
	return '';
};

export const randomId = () =>
	generateId({
		length: 10,
		type: 'alpha-numeric',
		alphaCase: 'mixed',
	});

class ExpressError extends Error {
	constructor(messages = [], status = 500) {
		super();
		this.message = messages;
		this.status = status;
	}
}

const catchAsync = (func) => {
	return (req, res, next) => {
		func(req, res, next).catch(next);
	};
};

const throwError = (messages = [], status = 500) => {
	throw new ExpressError(messages, status);
};

const errorHandler = (err, req, res, next) => {
	if (!err.message) err.message = ['Server error.'];
	return res
		.status(err.status || 500)
		.json({ error: { messages: err.message, stack: err.stack } });
};

module.exports = {
	ExpressError,
	errorHandler,
	catchAsync,
	throwError,
};

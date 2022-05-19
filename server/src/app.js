const express = require('express');
const app = express();
const path = require('path');
const { errorHandler } = require('./utils/error');
const session = require('express-session');
const passport = require('passport');
const { sessionConfig } = require('./config/db');
const helmet = require('helmet');

const authRoutes = require('./routes/auth/auth.router');
const usersRoutes = require('./routes/users/users.router');
const pagesRoutes = require('./routes/pages/pages.router');
const cellsRoutes = require('./routes/cells/cells.router');
const tabsRoutes = require('./routes/tabs/tabs.router');

if (process.env.NODE_ENV === 'production') {
	app.set('trust proxy', 1);
}

app.use(
	helmet.contentSecurityPolicy({
		directives: {
			connectSrc: ["'self'", 'https://unpkg.com/'],
			scriptSrc: [
				"'self'",
				"'unsafe-inline'",
				"'unsafe-eval'",
				'https://cdn.jsdelivr.net/',
			],
			workerSrc: ["'self'", 'blob:'],
		},
	})
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport');

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/cells', cellsRoutes);
app.use('/api/tabs', tabsRoutes);

app.all('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(errorHandler);

module.exports = app;

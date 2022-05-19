require('dotenv').config();
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log('ENV:', process.env.NODE_ENV || 'development');
	console.log(`Server running on port ${PORT}...`);
});

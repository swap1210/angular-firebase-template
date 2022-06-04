const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	// console.log('Thanks for the request 1');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Content-Type', 'application/json');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET');
	}

	next();
	// return res;
});

app.use('/calculate', require('./routes/calculate'));
app.use('/suggestions', require('./routes/names'));
app.use('/peek', require('./routes/peek'));
app.use('/reload', require('./routes/reload'));
app.use('/save', require('./routes/save'));

//error handling
app.use((req, res, next) => {
	const error = new Error('nothing found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: { message: error.message },
	});
	return res;
});

module.exports = app;

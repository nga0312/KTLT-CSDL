
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const port = process.env.PORT || 5500;
const apiPath = '/api/';
const apiRouter = require('./routes/items.route')

app.use(express.json());
app.use(express.urlencoded());

// website
app.use(express.static('client'));

// routers
app.use(apiPath + 'items', apiRouter);
// app.use(apiPath + 'products', require('./routes/products.route'));
// app.use(apiPath + 'upload', require('./routes/upload.route'));

app.listen(port, function () {
	const host = 'localhost';
	console.log('Example app listening at http://%s:%s', host, port);
});
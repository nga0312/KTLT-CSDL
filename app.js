const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5500;
const apiPath = '/api/';

app.use(express.json());
app.use(express.urlencoded());

// website
app.use(express.static('client'));

app.get('/hi', (request, response) => {
	response.send('response for GET request');
  });
// routers
app.use(apiPath + 'items', require('./routes/items.route'));
// app.use(apiPath + 'products', require('./routes/products.route'));
// app.use(apiPath + 'upload', require('./routes/upload.route'));

app.listen(port, function () {
	const host = '127.0.0.1';
	console.log('Example app listening at http://%s:%s', host, port);
});
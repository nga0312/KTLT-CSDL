
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const port = process.env.PORT || 5500;
const apiPath = '/api/';
const apiRouter = require('./routes/items.route')
const db = require('./database');

app.use(express.json());
app.use(express.urlencoded());

// website
app.use(express.static('client'));

//get data by id
app.get('/items/:id', function(req, res){
	var itemId = req.params.id;
	db.connectDB()
			.then((connection) => {
				connection.query(
					'SELECT * FROM fashionshop.product Where id = ?', 
					[itemId] ,
					function (err, data, fields) {
						console.log('data',data);
						db.closeDB(connection);
						return res.status(200).json(data);
					}
				);
			})
			.catch((error) => {
				console.log('Db not connected successfully', error);
				return res
					.status(200)
					.json({ result: `Không thể kết nối Database` });
			});
})

// routers
app.use(apiPath + 'items', apiRouter);
// app.use(apiPath + 'products', require('./routes/products.route'));
// app.use(apiPath + 'upload', require('./routes/upload.route'));

app.listen(port, function () {
	const host = 'localhost';
	console.log('Example app listening at http://%s:%s', host, port);
});
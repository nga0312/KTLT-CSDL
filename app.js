
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const port = process.env.PORT || 5500;
const apiPath = '/api/';
const apiRouter = require('./routes/items.route')
const db = require('./database');

const multer = require('multer');
const path = require('path')

app.use(express.json());
app.use(express.urlencoded());

// website
app.use(express.static('client'));

//upload img
const storage = multer.diskStorage({
	destination: './client/img/',
	filename:(req, file, cb) =>{
		cb(null, file.originalname)
	}
})

const upload = multer({
	storage: storage
});

//Hạnh
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

//Hạnh
//delete data by id
app.get('/delete/:id', function(req, res){
	var itemId = req.params.id;
	db.connectDB()
			.then((connection) => {
				connection.query(
					'DELETE FROM fashionshop.product Where id = ?', 
					[itemId] ,
					function (err, data, fields) {
						console.log('data',data);
						db.closeDB(connection);
						return res.status(200).json({ result: `Đã xóa data` });
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

//Hạnh
// sell +1 when buy item
app.post('/buy/:id', function(req, res){

	var itemId = req.params.id

	const sellOld = req.body.sell;
	const sell = Number(sellOld) + 1 ;

	db.connectDB()
		.then((connection) => {
			console.log('connected successfully');
			connection.query(
				// missing img
				`UPDATE fashionshop.product SET sell = '${sell}' WHERE id = ?`
				,[itemId] ,
				function (err, data, fields) {
					db.closeDB(connection);
					return res.status(200).json({ result: `đã bán ${sell} sản phẩm` });
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

//Hạnh
//edit data by id
app.post('/edit/:id', upload.single("image") ,function(req, res){

	var itemId = req.params.id

	const file = req.file;
	let image = req.body.oldImg;
	if(file){
		image = req.file.filename;
	}
	// else{
	// 	image = req.body.oldImg;
	// }

	const name = req.body.name;
	const intro = req.body.intro;
	const type = req.body.type;
	const price =req.body.price;
	const size = req.body.size;
	const brand = req.body.brand;
	const material= req.body.material;
	// const image = req.file.filename;
	const color = req.body.color;


	db.connectDB()
		.then((connection) => {
			console.log('connected successfully');
			connection.query(
				// missing img
				`UPDATE fashionshop.product SET productname = '${name}', intro = '${intro}', typeproduct = '${type}', price = ${price}, brand = '${brand}', size ='${size}', material = '${material}',color = '${color}',image = '${image}' WHERE id = ?`
				,[itemId] ,
				function (err, data, fields) {
					db.closeDB(connection);
					return res.status(200).json({ result: `đã sửa item ${image}` });
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

//Hưng
// routers
app.use(apiPath + 'items', apiRouter);
// app.use(apiPath + 'products', require('./routes/products.route'));
// app.use(apiPath + 'upload', require('./routes/upload.route'));

app.listen(port, function () {
	const host = 'localhost';
	console.log('Example app listening at http://%s:%s', host, port);
});
const Item = require('../models/item.model');
const items = require('../assets/items.json');
const db = require('../database');

class itemController {
	get(req, res) {
		db.connectDB()
			.then((connection) => {

				connection.query(
					'SELECT * FROM fashionshop',
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
	}

	post(req, res) {
		const name = req.body.name;
		// console.log('username', username);
		// console.log('password', password);

		db.connectDB()
			.then((connection) => {
				console.log('connected successfully');
				connection.query(
					`INSERT INTO fashionshop(productname,typeproduct, price, sell, brand,size, image) VALUES('${name}', '', NaN,NaN, '', '','')`,
					function (err, data, fields) {
					
						db.closeDB(connection);
						return res.status(200).json({ result: `Thành công` });
					}
				);
			})
			.catch((error) => {
				console.log('Db not connected successfully', error);
				return res
					.status(200)
					.json({ result: `Không thể kết nối Database` });
			});
	}
}
	

module.exports = new itemController();
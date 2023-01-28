const Item = require('../models/item.model');
const items = require('../assets/items.json');
const db = require('../database');

class itemController {
	get(req, res) {
		db.connectDB()
			.then((connection) => {

				connection.query(
					'SELECT * FROM fashionshop.product',
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
		const intro = req.body.intro;
		const type = req.body.type;
		const price =req.body.price;
		const size = req.body.size;
		const brand = req.body.brand;
		const material= req.body.material;
		const image = req.body.image;
		

		// console.log('username', username);
		// console.log('password', password);

		db.connectDB()
			.then((connection) => {
				console.log('connected successfully');
				connection.query(
					`INSERT INTO fashionshop.product(productname,intro,typeproduct, price, sell, brand,size, material, image) VALUES('${name}','${intro}', '${type}', '${price}',0, '${brand}', '${size}','${material}','${image}')`,
					// type, price, sell=0, brand= rong, size, image=''
					function (err, data, fields) {
					
						db.closeDB(connection);
						return res.status(200).json({ result: `data` });
					}
				);
			})
			.catch((error) => {
				console.log('Db not connected successfully', error);
				return res
					.status(200)
					.json({ result: `Không thể kết nối Database post ` });
			});
	}
}
	

module.exports = new itemController();
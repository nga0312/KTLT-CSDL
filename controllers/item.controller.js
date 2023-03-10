
//Hưng

const db = require('../database');

class itemController {
	get(req, res) {
		db.connectDB()
			.then((connection) => {

				connection.query(
					'SELECT * FROM fashionshop.product ORDER BY sell DESC',
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

	post(req, res, next) {

		const name = req.body.name;
		const intro = req.body.intro;
		const type = req.body.type;
		const price =req.body.price;
		const size = req.body.size;
		const brand = req.body.brand;
		const material= req.body.material;
		// const image = req.body.image;
		const color = req.body.color;
		const image = req.file.filename;

		db.connectDB()
			.then((connection) => {
				console.log(`connected successfully ${req.file}`);
				connection.query(
					`INSERT INTO fashionshop.product(productname,intro,typeproduct, price, sell, brand,size, material, image, color) VALUES('${name}','${intro}', '${type}', '${price}',0, '${brand}', '${size}','${material}','${image}','${color}')`,

					function (err, data, fields) {
					
						db.closeDB(connection);
						return res.status(200).json({ result: `data` });
					}
				);
			})
			.catch((error) => {
				console.log(`Db not connected successfully ${req.file}`, error);
				return res
					.status(200)
					.json({ result: `Không thể kết nối Database post ` });
			});
	}
}
	

module.exports = new itemController();
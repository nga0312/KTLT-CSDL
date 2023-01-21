const Item = require('../models/item.model');
const items = require('../assets/items.json');
const db = require('../database');
const { connect } = require('../routes/items.route');

class ItemController {
	get(req, res) {
		// return res.status(200).json('Chào bạn, đã nhận được yêu cầu của bạn !');
		const filter = req.query.filter;
		// console.log('filter', filter);
		const filterItems = items.filter((item) =>
			item.name.includes(filter)
		);
		return res
			.status(200)
			.json({ data: filterItems, length: filterItems.length });
	}

	post(req, res) {
		// const filter = req.body.filter;
		// console.log('filter', filter);
		const name = req.body.name;
		const price = req.body.price;
		console.log('name', name);
		console.log('price', price);
		
		db.connectDB()
			.then((connection)=>{
				console.log('connected successfully');
				connection.query(
					'SELECT * FROM items',
					function (err, data, fields){
						console.log('data', data);
						db.closeDB(connection);
						return res.status(200).json({ result: `Đã kết nối` });
					}
				);
			})
			.catch((error) =>{
				console.log('Do not conncted successfully', error);
				return res.status(200).json({ result: `không thể kết nối` });
			});	
	}
}

module.exports = new ItemController();
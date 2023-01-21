const Item = require('../models/item.model');
const items = require('../assets/items.json');

class ItemController {
	get(req, res) {
		// return res.status(200).json('Chào bạn, đã nhận được yêu cầu của bạn !');
		const filter = req.query.filter;
		// console.log('filter', filter);
		const filterItems = item.filter((person) =>
			items.name.includes(filter)
		);
		return res
			.status(200)
			.json({ data: filterItems, length: filterItems.length });
	}

	post(req, res) {
		const filter = req.body.filter;
		console.log('filter', filter);
		return res.status(200).json({ result: `Đã thêm hàng` });
	}
}

module.exports = new ItemController();
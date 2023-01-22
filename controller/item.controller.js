const Item = require('../models/item.model');
const items = require('../assets/items.json');

class ItemController {
	get(req, res) {
		// return res.status(200).json('Chào bạn, đã nhận được yêu cầu của bạn !');
		const filter = req.query.filter;
		// console.log('filter', filter);
		const filterItems = items.filter((person) =>
			person.nameitem.includes(filter)
		);
		return res
			.status(200)
			.json({ data: filterItems, length: filterItems.length });
	}

	post(req, res) {
		
		const nameitem = req.body.name;
		const img = req.body.inputimg;
		const price = req.body.price;
		const intro = req.body.intro;
		const type = req.body.type;

		// console.log("name", nameitem);
		// console.log("img", img);
		// console.log("price", price);
		return res.status(200).json({ result: `Chào bạn abc` });
	}
}

module.exports = new ItemController();
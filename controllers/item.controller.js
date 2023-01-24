const Item = require('../models/item.model');
const people = require('../assets/items.json');

class itemController {
	get(req, res) {
		return res
			.status(200)
            .json('hello');
	}

	post(req, res) {
		return res.status(200).json({ result: `Chào bạn abc` });
	}
}

module.exports = new itemController();
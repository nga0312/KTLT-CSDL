class Items {
	Item() {
		this.name = '';
	}

	getInfo() {
		return { name: this.name };
	}
}

module.exports = Items;
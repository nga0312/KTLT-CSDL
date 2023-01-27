class Items {
	Item() {
		this.id = Number;
		this.productname = String;
		this.intro = String;
		this.typeproduct = String;
		this.price = Number;
		this.sell =Number;
		this.brand =String;
		this.size = String;
		this.image = String; 
	}

	getInfo() {
		return { id: this.id };
	}
}

module.exports = Items;
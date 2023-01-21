class Item {

    constructor(id, name, type, price, img, intro){
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.img = img;
        this.intro = intro;
        return this;
    }

	Item() {
        this.id = Number;
        this.name = '';
        this.type = '';
        this.price = Number;
        this.img = '';
        this.intro = '';
	}
}

module.exports = Item;
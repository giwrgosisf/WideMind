class cartItem {
   constructor(id , type, price , img,  title){
         this._id = id;
         this._type = type;
         this._price = price;
         this._title = title;
         this._img = img;
   }

    set id(id){
        this._id = id;
    }

    get id(){
        return this._id;
    }

    set type(type){
        this._type = type;
    }

    get type(){
        return this._type;
    }

    set price(price){
        this._price = price;
    }

    get price(){
        return this._price;
    }

    set title(title){
        this._title = title;
    }

    get title(){
        return this._title;
    }

    set img(img){
        this._img = img;
    }

    get img(){
        return this._img;
    }

    updateCartItem(cartItem){
        this._id = cartItem.id;
        this._type = cartItem.type;
        this._price = cartItem.price;
        this._title = cartItem.title;
        this._img = cartItem.img;
    }

    equals(other) {
        if (other == null) {
            return false;
        }

        if (!(other instanceof cartItem)) {
            return false;
        }
        return this.id === other.id;
    }
}
    
module.exports = cartItem;
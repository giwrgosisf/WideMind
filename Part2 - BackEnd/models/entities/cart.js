
class Cart{
    constructor(username, sessionId = null){
        this._cartItems = [];
        this._username = username;
        this._sessionId = sessionId;
    }

    set cartItems(cartItems){
        this._cartItems = cartItems;
    }

    get cartItems(){
        return this._cartItems;
    }

    set username(username){
        this._username = username;
    }

    get username(){
        return this._username;
    }

    set sessionId(sessionId){
        this._sessionId = sessionId;
    }

    get sessionId(){
        return this._sessionId;
    }

    addCartItem(cartItem){
        this._cartItems.push(cartItem);
    }

    removeCartItem(cartItem){  
        const index = this._cartItems.findIndex((item) => item.id === cartItem.id);
        if (index !== -1) {
            this._cartItems.splice(index, 1);
        }
    }

    findCartItem(cartItem) {
        const foundItem = this._cartItems.find(item => item.equals(cartItem));
    
        return foundItem === undefined ? undefined : foundItem;
    }


    findCartItemById(id) {
        let foundItem = this._cartItems.find(item => item.id === id);
    
        if (foundItem === undefined) {
            foundItem = null;
        }

        return foundItem;

    }

    

    
    

    updateCart(cart){
        this._cartItems = cart.cartItems;
        this._username = cart.username;
        this._sessionId = cart.sessionId;
    }

    

    

}

module.exports = Cart;
const daoManager = require("../DAO/DAOManager");
const Cart = require("../entities/cart");
const serviceMessage = require("../entities/serviceMessage");


class CartItemService {
     statusCode = 0;

   addCartItem(cartItem , sessionId , username) {
       
        const cartDAO = daoManager.getCartDAO;
        const cart = cartDAO.findCartById(username, sessionId);
        
        
        if(cart===null){
            const cart = new Cart(username, sessionId);
            cart.addCartItem(cartItem);
            daoManager.getCartDAO.addCart(cart);
            console.log(cart);
            this.statusCode = 200;
        }else if(cart.findCartItemById(cartItem) === undefined){
            cart.addCartItem(cartItem);
            console.log(cart);
            this.statusCode = 200;
        }else{
           this.statusCode = 409;
        }
        
        return this.statusCode;
    }
    
}

module.exports = CartItemService;
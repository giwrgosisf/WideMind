const Cart = require('../entities/cart');
const userDAO = require('./userDAO');

class cartDAO {
    constructor() {
        this.cartsList = [];
    }

    findCartById(username, sessionId) {
        let result = this.cartsList.find(cart => cart.username === username && cart.sessionId === sessionId)

        if (result === undefined) {
            result = null;
        }

        return result;
    }

    addCart(cart) {
        const existingCart = this.cartsList.find(c => c.username === cart.username && c.sessionId === cart.sessionId)

        if (!existingCart) {
            this.cartsList.push(cart);
        }

        
       
    }

    findCartBySessionId(sessionId) {
        let result = this.cartsList.find(cart => cart.sessionId === sessionId)

        if (result === undefined) {
            result = null;
        }

        return result;
    }

    

    deleteCartBySessionId(sessionId) {
        let index = this.cartsList.findIndex(cart => cart.sessionId === sessionId)

        if (index === -1) {
            return false;
        }

        this.cartsList.splice(index, 1);
        return true;
    }
}

module.exports =  cartDAO;
const daoManager = require("../DAO/DAOManager");
const Cart = require("../entities/cart");



class CartItemService {

    addCartItem(cartItem, sessionId, username) {
        let statusCode = 0;
        try {
            const userDAO = daoManager.getUserDAO;
            const users = userDAO.findUserById(username, sessionId);

            if (users === null) {
                // User not found
                statusCode = 401;
                return statusCode;
            }

            const cartDAO = daoManager.getCartDAO;
            let cart = cartDAO.findCartById(username, sessionId);


            if (cart === null) {
                cart = new Cart(username, sessionId);
                cart.addCartItem(cartItem);
                cartDAO.addCart(cart);
                console.log(cart);
                statusCode = 200;
            } else if (cart.findCartItem(cartItem) === undefined) {
                cart.addCartItem(cartItem);
                const updateSuccess = cartDAO.updateCart(cart);
                if (!updateSuccess) {
                    console.log("Unable to update the cart")
                    statusCode = 409;
                    return statusCode;
                }
                console.log("Cart Updated:", cart);
                statusCode = 200; // OK
                console.log(cart);
            } else {
                console.log("Item already in the cart")
                statusCode = 409;
            }

            return statusCode;

        } catch (error) {
            console.error("Error in addCartItem:", error);
            statusCode = 500;
            return statusCode;
        }

    }


    removeCartItem(itemId, sessionId, username) {
        let statusCode = 0;
        try {
            const userDAO = daoManager.getUserDAO;
            const users = userDAO.findUserById(username, sessionId);

            if (users === null) {
                // User not found
                statusCode = 401;
                return statusCode;
            }

            const cartDAO = daoManager.getCartDAO;
            const cart = cartDAO.findCartById(username, sessionId);
            if (cart === null) {
                // Cart not found
                console.log("No cart found for the user")
                statusCode = 404;
                return statusCode;
            }

            const itemToRemove = cart.findCartItemById(itemId);
            if (itemToRemove === null) {
                // Cart item not found
                console.log("Item not found in the cart")
                statusCode = 404;
                return statusCode;
            }

            cart.removeCartItem(itemToRemove);
            const updateSuccess = cartDAO.updateCart(cart);

            if (!updateSuccess) {
                console.log("Conflict: Unable to update the cart")
                statusCode = 409;
                return statusCode;
            }

            console.log("Cart Updated after Removal:", cart);
            statusCode = 200;
            const totalCost = cart.cartItems.reduce((total, item) => total + item.price, 0);
            const response = {
                statusCode: statusCode,
                totalCost: totalCost
            };

            return JSON.stringify(response);

        } catch (error) {
            console.error("Error in removeCartItem:", error);
            statusCode = 500;
            return statusCode;
        }
    }


    getCartItems(username, sessionId) {
        let statusCode = 0;
        try {

            const userDAO = daoManager.getUserDAO;
            const users = userDAO.findUserById(username, sessionId);

            if (users === null) {
                // User not found
                statusCode = 401;
                return statusCode;
            }

            const cartDAO = daoManager.getCartDAO;
            let cart = cartDAO.findCartById(username, sessionId);

            statusCode = 200;

            if (cart === null) {
                // Cart not found, so we create a new empty cart
                cart = new Cart(username, sessionId);
                cartDAO.addCart(cart);
                console.log("New cart created:", cart);
                return JSON.stringify({ cartItems: [], totalCost: 0 });
            } else {
                console.log("Cart already exists for user:", username);
            }

            const cartItems = cart.cartItems;


            if (cartItems.length === 0) {
                // No items in the cart
                return JSON.stringify({ cartItems: [], totalCost: 0 });
            }



            const cartItemsData = cartItems.map(item => ({
                id: item.id,
                type: item.type,
                price: item.price,
                image: item.img,
                title: item.title
            }));

            const totalCost = cartItemsData.reduce((total, item) => total + item.price, 0);

            const response = {
                cartItems: cartItemsData,
                totalCost: totalCost
            };

            return JSON.stringify(response);

        } catch (error) {
            console.error("Error in getCartItem:", error);
            statusCode = 500;
            return statusCode;
        }
    }


}

module.exports = CartItemService;
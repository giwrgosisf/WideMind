const express = require('express')
const path = require('path')
const app = express()
const port = 8080

const daoManager = require('./models/DAO/DAOManager');
const Authentication = require('./models/services/Authentication');
const CartItemService = require('./models/services/CartItemService');
const cartItem = require('./models/entities/cartItem');
const Cart = require('./models/entities/cart');

daoManager.createTestUsers();

const authentication = new Authentication();
const cartItemService = new CartItemService();

app.listen(port)

/* 
    Serve static content from directory "public",
    it will be accessible under path /, 
    e.g. http://localhost:8080/index.html
*/
app.use(express.static('public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function (req, res) {

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function (err) {
        console.log(err)
    })
})



app.post('/login', async function (req, res) {

    const data = req.body;
    const username = data.username;
    const password = data.password;

    try {
        const sessionId = authentication.authenticate(username, password);

        if (sessionId !== null) {
            res.status(200).json({ sessionId });
        } else {
            res.status(401).json({ error: 'Invalid username or password.' });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/cart/add', async function (req, res) {

    const data = req.body;
    const sessionId = data.sessionId;
    const username = data.username;
    const type = data.type;
    const title = data.title;
    const price = parseFloat(data.price);
    const img = data.img; 
    const id = data.id;


    let item = new cartItem(id, type, price, img, title);
    try {
        if (cartItemService.addCartItem(item, sessionId, username) === 409) {
            res.status(409).json({ error: 'Item already in cart' });
        } else {
            res.status(200).json({ message: 'Item added to cart' });
        }


    } catch (error) {
        console.error('Cart add error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.get('/cart/retrieve', async function (req, res) {

    const sessionId = req.query.sessionId;
    const username = req.query.username;

    if (!username || !sessionId) {
        res.status(400).json({ error: 'Missing username or sessionId in query parameters.' });
    }


    try {
        const cartData = cartItemService.getCartItems(username, sessionId);
        if (typeof cartData === 'string') {
            try {
                const cartItems = JSON.parse(cartData);
                res.status(200).json(cartItems);
            } catch (error) {
                console.error("Invalid JSON:", error);
                res.status(400).json({ error: 'Invalid JSON format.' });
            }
        } else {
            let errorMessage;
            switch (cartData) {
                case 401:
                    errorMessage = 'Unauthorized: Invalid username or session.';
                    break;
                case 404:
                    errorMessage = 'Not Found: Cart does not exist or is empty.';
                    break;
                case 500:
                    errorMessage = 'Internal Server Error: Please try again later.';
                    break;
                default:
                    errorMessage = 'An unexpected error occurred.';
            }

            res.status(cartData).json({ error: errorMessage });
        }

    } catch (error) {
        console.error('Cart retrieve error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


});



app.delete('/cart/item', async function (req, res) {

    const data = req.body;
    const sessionId = data.sessionId;
    const username = data.username;
    const itemId = data.id;

    if (!username || !sessionId || !itemId) {
        return res.status(400).json({ error: 'Missing username, sessionId, or item id in request body.' });
    }

    try {
        const resultDelete = cartItemService.removeCartItem(itemId, sessionId, username);
        if (typeof resultDelete === 'string') {
            try {
                const parsedResult = JSON.parse(resultDelete);
                if (parsedResult.statusCode === 200) {
                    res.status(200).json({
                        message: 'Item successfully removed from the cart.',
                        totalCost: parsedResult.totalCost
                    });
                } else {
                    console.error("Error parsing JSON:", parsedResult);
                    res.status(500).json({ error: 'Unexpected response from server.' });
                }
            } catch (error) {
                console.error("Invalid JSON:", error);
                res.status(400).json({ error: 'Invalid JSON format.' });
            }

        } else {
            let errorMessage;

            switch (resultDelete) {
                case 401:
                    errorMessage = 'Unauthorized: Invalid username or session.';
                    break;
                case 404:
                    errorMessage = 'Not Found: Item does not exist.';
                    break;
                case 409:
                    errorMessage = 'Conflict: Unable to update the cart.';
                    break;
                case 500:
                    errorMessage = 'Internal Server Error: Please try again later.';
                    break;
                default:
                    errorMessage = 'An unexpected error occurred.';
            }

            res.status(resultDelete).json({ error: errorMessage });

        }
    } catch (error) {
        console.error('Error in deleting item', error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }


});

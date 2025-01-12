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

app.post('/cart', async function (req, res) {

    const data = req.body;
    const sessionId = data.sessionId;
    const username = data.username;
    const type = data.type;
    const title = data.title;
    const price = data.price;
    const id = data.id;


    let  item = new cartItem(id, type, price, title);
    try {        
        if(cartItemService.addCartItem(item, sessionId, username) === 409){
            res.status(409).json({ error: 'Item already in cart' });
        }else{
            res.status(200).json({ message: 'Item added to cart' });
        }


    }catch(error){
        console.error('Cart error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
});

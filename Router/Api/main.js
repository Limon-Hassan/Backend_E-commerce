let express = require('express');
let router = express.Router();
const auth = require('./auth'); // Imported Auth routes (Login, Registration, etc.)
let category = require('./category');
let product = require('./product');
let cart = require('./cart');
let checkout = require('./Checkout');

// Route for authentication (user login, registration)
router.use('/auth', auth);

router.use('/category', category);
router.use('/products', product);
router.use('/cart', cart);
router.use('/checkout', checkout);

module.exports = router;

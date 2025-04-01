let express = require('express');
let router = express.Router();
const auth = require('./auth');
let category = require('./category');
let product = require('./product');
let cart = require('./cart');
let checkout = require('./Checkout');

router.use('/auth', auth);
router.use('/category', category);
router.use('/products', product);
router.use('/cart', cart);
router.use('/checkout', checkout);

module.exports = router;

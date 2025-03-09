let express = require('express');
let router = express.Router();
const auth = require('./auth');
let category = require('./category');
let product = require('./product');

router.use('/auth', auth);
router.use('/category', category);
router.use('/products', product);

module.exports = router;

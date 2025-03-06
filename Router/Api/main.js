let express = require('express');
let router = express.Router();
const auth = require('./auth');
let category = require('./category');

router.use('/auth', auth);
router.use('/category', category);

module.exports = router;

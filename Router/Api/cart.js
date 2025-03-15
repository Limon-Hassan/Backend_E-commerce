let express = require('express');
const { cartadd } = require('../../All_Controller/cartController');
const errorCheck = require('../../Helpers/imageError');
let router = express.Router();

router.post('/addtocart', errorCheck, cartadd);

module.exports = router;

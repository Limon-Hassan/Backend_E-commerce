let express = require('express');
const { checkoutCart } = require('../../All_Controller/Checkoutcontroller');
let router = express.Router();

router.post('/checkOut',checkoutCart);
router.get('/getCheckout/:id', );

module.exports = router;

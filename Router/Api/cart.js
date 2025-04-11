let express = require('express');
const {
  cartadd,
  getCart,
  DeleteCart,
  IncrementCart,
  getcartInfo,
  getCartSummery,
} = require('../../All_Controller/cartController');
const errorCheck = require('../../Helpers/imageError');
const { auth } = require('../../Midlewere/authMidlewere');
let router = express.Router();

router.post('/addtocart', auth, cartadd);
router.get('/getCartSummery/:id', auth, getCartSummery);
router.get('/getcartInfo/:id', auth, getcartInfo);
router.delete('/DeleteCart/:id', DeleteCart);
router.put('/IncrementCart/:id', errorCheck, IncrementCart);
module.exports = router;

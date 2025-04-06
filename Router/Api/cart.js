let express = require('express');
const {
  cartadd,
  getCart,
  DeleteCart,
  IncrementCart,
} = require('../../All_Controller/cartController');
const errorCheck = require('../../Helpers/imageError');
const { auth } = require('../../Midlewere/authMidlewere');
let router = express.Router();

router.post('/addtocart', auth, cartadd);
router.get('/getCart/:id', auth, getCart);
router.delete('/DeleteCart/:id', auth, DeleteCart);
router.put('/IncrementCart/:id', errorCheck, IncrementCart);
module.exports = router;

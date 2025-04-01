let express = require('express');
const {
  cartadd,
  getCart,
  DeleteCart,
  IncrementCart,
} = require('../../All_Controller/cartController');
const errorCheck = require('../../Helpers/imageError');
let router = express.Router();

router.post('/addtocart', cartadd);
router.get('/getCart/:id', getCart);
router.delete('/DeleteCart/:id', DeleteCart);
router.patch('/IncrementCart/:id', IncrementCart);
module.exports = router;

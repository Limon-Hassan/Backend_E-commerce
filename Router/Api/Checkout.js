let express = require('express');
const {
  checkoutCart,
  Getcheckout,
  Deletecheckout,
  updateOrderStatus,
} = require('../../All_Controller/Checkoutcontroller');
let router = express.Router();

router.post('/checkOut', checkoutCart);
router.get('/getCheckout', Getcheckout);
router.get('/getCansellation', Getcheckout);
router.patch('/UpdateCheckout/:id/', updateOrderStatus);
router.delete('/DeleteCheckout', Deletecheckout);

module.exports = router;

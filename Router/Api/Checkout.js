let express = require('express');
const {
  checkoutCart,
  Getcheckout,
  Deletecheckout,
  updateOrderStatus,
} = require('../../All_Controller/Checkoutcontroller');
const { auth, authAdmin } = require('../../Midlewere/authMidlewere');
let router = express.Router();

router.post('/checkOut', auth, checkoutCart);
router.get('/getCheckout', authAdmin, Getcheckout);
router.get('/getCansellation', auth, authAdmin, Getcheckout);
router.patch('/UpdateCheckout/:id/', authAdmin, auth, updateOrderStatus);
router.delete('/DeleteCheckout', authAdmin, Deletecheckout);

module.exports = router;

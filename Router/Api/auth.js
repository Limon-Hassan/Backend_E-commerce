let express = require('express');
const {
  regisationController,
  loginController,
  otp_verify,
  reset_otp,
} = require('../../All_Controller/authController');
const { authUser } = require('../../Midlewere/authMidlewere');

let router = express.Router();

router.post('/regisation', regisationController);
router.post('/login', loginController);
router.post('/otp-verify', otp_verify);
router.post('/otp-reset', reset_otp);
router.get('/user', authUser, (req, res) => {
  res.send('admin see the users');
});

module.exports = router;

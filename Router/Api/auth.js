let express = require('express');
const {
  regisationController,
  loginController,
  otp_verify,
  reset_otp,
} = require('../../All_Controller/authController');
const { authAdmin } = require('../../Midlewere/authMidlewere');
const userSchema = require('../../Model/userSchema');

let router = express.Router();

router.post('/regisation', regisationController);
router.post('/login', loginController);
router.post('/otp-verify', otp_verify);
router.post('/otp-reset', reset_otp);
router.get('/user', authAdmin, async (req, res) => {
  let users = await userSchema.find({});
  res.send(users);
});

module.exports = router;

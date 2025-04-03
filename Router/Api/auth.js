let express = require('express');
const {
  regisationController,
  loginController,
  otp_verify,
  reset_otp,
} = require('../../All_Controller/authController');
const { authAdmin } = require('../../Midlewere/authMidlewere');
const userSchema = require('../../Model/userSchema');
const errorCheck = require('../../Helpers/imageError');

let router = express.Router();

router.post('/regisation', errorCheck, regisationController);
router.post('/login', errorCheck, loginController);
router.post('/otp-verify', otp_verify);
router.post('/otp-reset', reset_otp);
router.get('/user', authAdmin, async (req, res) => {
  let users = await userSchema.find({});
  res.send(users);
});

module.exports = router;

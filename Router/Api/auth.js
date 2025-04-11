let express = require('express');
const {
  regisationController,
  loginController,
  otp_verify,
  reset_otp,
} = require('../../All_Controller/authController');
const { authAdmin, auth } = require('../../Midlewere/authMidlewere');
const userSchema = require('../../Model/userSchema');
const errorCheck = require('../../Helpers/imageError');

let router = express.Router();

router.post('/regisation', regisationController);
router.post('/login', loginController);
router.post('/otp-verify', otp_verify);
router.post('/otp-reset', reset_otp);

router.get('/user', auth, (req, res) => {
  if (req.user) {
    res.send({ user: req.user });
  } else {
    res
      .status(401)
      .send({ msg: 'Token expired or invalid. Please log in again.' });
  }
});

// Admin route - Protected by admin-specific auth middleware
router.get('/admin', authAdmin, async (req, res) => {
  let users = await userSchema.find({});
  res.send(users);
});

module.exports = router;

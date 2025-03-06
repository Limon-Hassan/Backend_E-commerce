let express = require('express');
const {
  regisationController,
  loginController,
} = require('../../All_Controller/authController');
const { authUser } = require('../../Midlewere/authMidlewere');

let router = express.Router();

router.post('/regisation', regisationController);
router.post('/login', loginController);
router.get('/user', authUser, (req, res) => {
  res.send('admin see the users');
});

module.exports = router;

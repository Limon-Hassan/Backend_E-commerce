let express = require('express');
const {
  regisationController,
  loginController,
} = require('../../All_Controller/authController');

let router = express.Router();

router.post('/regisation', regisationController);
router.post('/login', loginController);

module.exports = router;

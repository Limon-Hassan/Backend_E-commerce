let express = require('express');
let router = express.Router();
const auth = require("./auth");

router.use('/auth', auth);

module.exports = router;

let express = require('express');
let router = express.Router();
let Api = require('./Api/main');

const baseURl = process.env.BASE_ulr;
router.use(baseURl, Api);
router.use(baseURl, (req, res) => {
  res.status(404).send({ Error: 'no api route found' });
});

module.exports = router;

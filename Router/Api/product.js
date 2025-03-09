let express = require('express');
const productControll = require('../../All_Controller/productController');
let router = express.Router();
const multer = require('multer');
const errorCheck = require('../../Helpers/imageError');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './productImage');
  },
  filename: function (req, file, cb) {
    let fileSize = req.headers['content-length'];
    // const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + fileSize + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  '/addProducts',
  upload.array('image', 12),
  errorCheck,
  productControll
);

module.exports = router;

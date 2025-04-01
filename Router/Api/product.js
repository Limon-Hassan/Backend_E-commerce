let express = require('express');
const {
  productControll,
  deleteProducts,
  getAllProducts,
  updateProducts,
} = require('../../All_Controller/productController');
let router = express.Router();
const multer = require('multer');
const errorCheck = require('../../Helpers/imageError');
const path = require('path');
const { authAdmin } = require('../../Midlewere/authMidlewere');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './productImage');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let extencion = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueName + extencion);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  '/addProducts',
  // authAdmin,
  upload.array('photo', 12),
  // errorCheck,
  productControll
);

router.delete('/deleteproducts/:id', authAdmin, deleteProducts);
router.get('/getProducts', getAllProducts);
router.patch(
  '/updateProducts/:id',
  authAdmin,
  upload.array('photo', 12),
  updateProducts
);
module.exports = router;

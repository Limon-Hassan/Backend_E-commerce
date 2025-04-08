let express = require('express');
const {
  productControll,
  deleteProducts,
  updateProducts,
  getTopProducts,
  addProductReview,
  getProducts,
  getReviews,
} = require('../../All_Controller/productController');
let router = express.Router();
const multer = require('multer');
const errorCheck = require('../../Helpers/imageError');
const path = require('path');
const { authAdmin, auth } = require('../../Midlewere/authMidlewere');
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
  authAdmin,
  upload.array('photo', 12),
  productControll
);
router.post('/add-review', addProductReview);
router.delete('/deleteproducts/:id', authAdmin, deleteProducts);
router.get('/getProducts', getProducts);
router.get('/getReviews', getReviews);
router.get('/TopProducts', getTopProducts);
router.patch(
  '/updateProducts/:id',
  authAdmin,
  upload.array('photo', 12),
  updateProducts
);
module.exports = router;

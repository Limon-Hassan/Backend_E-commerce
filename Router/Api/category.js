let express = require('express');
const {
  categoryControll,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require('../../All_Controller/categoryController');
let router = express.Router();
const multer = require('multer');
const errorCheck = require('../../Helpers/imageError');
const path = require('path');
const { authUser } = require('../../Midlewere/authMidlewere');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + uniqueName + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post(
  '/createcategory',
  authUser,
  upload.array('image', 12),
  errorCheck,
  categoryControll
);

router.delete('/deletecategory/:id', authUser, deleteCategory);
router.get('/getAllCategories', getAllCategories);
router.patch(
  '/updateCategory/:id',
  authUser,
  upload.array('image', 12),
  updateCategory
);

module.exports = router;

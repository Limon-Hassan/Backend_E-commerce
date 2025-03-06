let express = require('express');
const { categoryControll } = require('../../All_Controller/categoryController');
let router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let extention = file.originalname.split('.');
    cb(null, file.fieldname + '-' + uniqueName + `.${extention[1]}`);
  },
});

const upload = multer({ storage: storage });

router.post('/createcategory', upload.single('image'), categoryControll);

module.exports = router;

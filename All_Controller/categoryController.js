const categoryModel = require('../Model/categoryModel');

async function categoryControll(req, res) {
  let { name, description, image } = req.body;
  res.send(req.body);
  return;
  let product = new categoryModel({
    name,
    description,
    image,
  });
}
module.exports = { categoryControll };

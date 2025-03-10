const categoryModel = require('../Model/categoryModel');
const productSchema = require('../Model/productSchema');

async function productControll(req, res) {
  try {
    let { name, description, price, category } = req.body;
    let fileName = req.files;
    let fileNames = [];
    fileName.forEach(element => {
      fileNames.push(process.env.local_host + element.filename);
    });
    let product = new productSchema({
      name,
      description,
      price,
      category,
      Photo: fileNames,
    });
    await product.save();
    let incategory = await categoryModel.findOneAndUpdate(
      { _id: category },
      { $push: { product: product._id } },
      {
        new: true,
      }
    );
    await incategory.save();
    res.status(201).send({ msg: 'products created', product });
  } catch (error) {
    res.status(400).send({ msg: 'error', error: error.message });
  }
}
module.exports = productControll;

// cetegory te product id jai nah
// image jodi folder modhe same thke tahole same image upload hote dibo nH
// image onk gulo hole array formet a database kivhave nivo

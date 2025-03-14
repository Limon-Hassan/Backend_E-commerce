const categoryModel = require('../Model/categoryModel');
const productSchema = require('../Model/productSchema');
let path = require('path');
let fs = require('fs');


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

async function deleteProducts(req, res) {
  try {
    const { id } = req.params;

    let product = await productSchema.findById(id);

    if (!product) {
      return res.status(404).send({ msg: 'Product not found' });
    }

    let deletePro = await productSchema.findOneAndDelete({ _id: id });

    if (!deletePro) {
      return res
        .status(404)
        .send({ msg: 'Failed to delete product from database' });
    }

    const deletePromises = product.Photo.map(imagePath => {
      return new Promise((resolve, reject) => {
        const PhotoPathOnServer = path.join(
          __dirname,
          '../productImage',
          imagePath.split('/').pop()
        );

        fs.unlink(PhotoPathOnServer, err => {
          if (err) {
            return reject('Failed to delete image'); 
          }
          resolve();
        });
      });
    });

    await Promise.all(deletePromises);

    res.send({
      msg: 'Product and associated images deleted successfully',
      data: deletePro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'An error occurred', error: error.message });
  }
}

async function getAllProducts(req, res) {
  try {
    let getProduct = await productSchema.find({});
    res.send({ msg: 'asche', data: getProduct });
  } catch (error) {
    res.status(400).send({ msg: 'error hoise', error: error.message });
  }
}

async function updateProducts(req, res) {
  try {
    let { id } = req.params;
    let fileName = req.files;
    let fileNames = [];
    if (Array.isArray(fileName)) {
      fileName.forEach(element => {
        fileNames.push(process.env.local_host + element.filename);
      });
    } else {
      fileNames.push(process.env.local_host + fileName.filename);
    }
    let { changeName, ChangeDescription, Changeprice, Changecategory } =
      req.body;
    let updatePro = await productSchema.findOneAndUpdate(
      { _id: id },
      {
        name: changeName,
        description: ChangeDescription,
        Photo: fileNames,
        price: Changeprice,
        category: Changecategory,
      },
      { new: true }
    );
    if (!updatePro) {
      return res.status(404).send({ msg: 'Category not found' });
    }
    await updatePro.save();
    res.send({ msg: 'update hoise', data: updatePro });
  } catch (error) {
    res.status(400).send({ msg: 'error hoise', error: error.message });
  }
}
module.exports = {
  productControll,
  deleteProducts,
  getAllProducts,
  updateProducts,
};

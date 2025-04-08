const categoryModel = require('../Model/categoryModel');
const productSchema = require('../Model/productSchema');
let path = require('path');
let fs = require('fs');
const reviewSchema = require('../Model/reviewSchema');

async function productControll(req, res) {
  try {
    const { name, description, price, category, stock, brand } = req.body;
    const fileName = req.files;

    const fileNames = fileName.map(
      element => `${process.env.local_host}${element.filename}`
    );

    const product = new productSchema({
      name,
      description,
      price,
      category,
      brand,
      stock,
      Photo: fileNames,
    });

    await product.save();

    return res.status(201).send({
      msg: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      msg: 'Error creating product',
      error: error.message,
    });
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

async function getProducts(req, res) {
  try {
    const { id } = req.query;

    if (id) {
      const product = await productSchema
        .findById(id)
        .populate('category')
        .populate({
          path: 'review',
          populate: {
            path: 'user',
            select: 'name',
          },
        });

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      return res
        .status(200)
        .json({ msg: 'Single product fetched', data: product });
    }

    const products = await productSchema
      .find()
      .populate('category')
      .populate({
        path: 'review',
        populate: {
          path: 'user',
          select: 'name',
        },
      });

    res.status(200).json({ msg: 'All products fetched', data: products });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Error fetching product(s)', error: error.message });
  }
}

async function getTopProducts(req, res) {
  try {
    const topProducts = await Product.find({ isTopProduct: true })
      .sort({ sold: -1 }) 
      .limit(10);

    res.status(200).json({
      success: true,
      data: topProducts,
    });
  } catch (error) {
    console.error('Error fetching top products:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function addProductReview(req, res) {
  try {
    const { user, productId, comment, rating } = req.body;

    const newReview = await reviewSchema.create({
      product: productId,
      user: user,
      comment,
      rating,
    });

    await productSchema.findByIdAndUpdate(productId, {
      $push: { review: newReview._id },
    });

    const allReviews = await reviewSchema
      .find({ product: productId })
      .populate('user', 'name');
    console.log(allReviews);
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = (totalRating / allReviews.length).toFixed(1);

    await productSchema.findByIdAndUpdate(productId, {
      rating: averageRating,
      totalReviews: allReviews.length,
    });

    res.status(201).json({
      success: true,
      message: 'Review added successfully!',
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getReviews(req, res) {
  try {
    const { productId } = req.query;

    const reviews = await reviewSchema
      .find({ product: productId })
      .populate('user', 'name');

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
  getProducts,
  getReviews,
  addProductReview,
  getTopProducts,
  updateProducts,
};

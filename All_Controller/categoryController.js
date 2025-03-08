const categoryModel = require('../Model/categoryModel');

async function categoryControll(req, res) {
  try {
    let { name, description } = req.body;
    let fileName = req.files[0].filename;
    if (!name || !description) {
      return res.status(400).send({ msg: 'Name and description are required' });
    } else {
      let products = new categoryModel({
        name,
        description,
        Image: process.env.local_host + fileName,
      });
      await products.save();
      res.send({ msg: 'Category created successfully', data: products });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ msg: 'Internal server error', error: error.message });
  }
}

module.exports = { categoryControll };

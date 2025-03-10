const categoryModel = require('../Model/categoryModel');

async function categoryControll(req, res) {
  try {
    let { name, description } = req.body;
    let fileName = req.files;
    let fileNames = [];
    fileName.forEach(element => {
      fileNames.push(process.env.local_host + element.filename);
    });
    if (!name || !description) {
      return res.status(400).send({ msg: 'Name and description are required' });
    } else {
      let products = new categoryModel({
        name,
        description,
        Image: fileNames,
      });
      await products.save();
      res.send({ msg: 'Category created successfully', data: products });
    }
  } catch (error) {
    res
      .status(500)
      .send({ msg: 'Internal server error', error: error.message });
  }
}
async function deleteCategory(req, res) {
  try {
    let { id } = req.params;

    let deleteCategorys = await categoryModel.findOne({ _id: id });

    if (!deleteCategorys) {
      return res.status(404).send({ msg: 'Category not found' });
    }

    deleteCategorys.Image.map(imagePath => {
      const oldimage = imagePath.split('/');
      return res.send(oldimage[oldimage.length - 1]);
    });

    return res.send({ msg: 'Category found', imageFileNames });
  } catch (error) {
    return res
      .status(500)
      .send({ msg: 'Error in deleting category', error: error.message });
  }
}
module.exports = { categoryControll, deleteCategory };

const categoryModel = require('../Model/categoryModel');
let fs = require('fs');
let path = require('path');

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
    const { id } = req.params;
    let category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({ msg: 'Category not found' });
    } else {
      let deleteCat = await categoryModel.findOneAndDelete({ _id: id });
      res.send({
        msg: 'delete successfull',
        data: deleteCat,
      });
    }
    // if (action === 'deleteImage') {
    //   if (category.Image && category.Image.length > 0) {
    //     const deletePromises = category.Image.map(imagePath => {
    //       return new Promise((resolve, reject) => {
    //         const imagePathOnServer = path.join(
    //           __dirname,
    //           '../uploads',
    //           imagePath.split('/').pop()
    //         );

    //         fs.unlink(imagePathOnServer, err => {
    //           if (err) {
    //             reject(err);
    //           } else {
    //             resolve();
    //           }
    //         });
    //       });
    //     });
    //     await Promise.all(deletePromises);
    //     category.Image = [];
    //     await category.save();

    //     return res.status(200).send({ msg: 'Images deleted successfully' });
    //   } else {
    //     return res.status(400).send({ msg: 'No images found to delete' });
    //   }
    // }

    // if (action === 'deleteDocument') {
    //   if (category.Image && category.Image.length > 0) {
    //     category.Image.forEach(imagePath => {
    //       const imagePathOnServer = path.join(
    //         __dirname,
    //         '../uploads',
    //         imagePath.split('/').pop()
    //       );

    //       fs.unlink(imagePathOnServer, err => {
    //         if (err) {
    //           console.log(`Error deleting image: ${imagePathOnServer}`, err);
    //         }
    //       });
    //     });
    //   }
    //   await categoryModel.findByIdAndDelete(id);

    //   return res.status(200).send({
    //     msg: 'Category document deleted successfully, images are also removed.',
    //   });
    // }
  } catch (error) {
    res.status(500).send({
      msg: 'Error processing the request',
      error: error.message,
    });
  }
}
async function getAllCategories(req, res) {
  try {
    let getAll = await categoryModel.find({});
    res.send({ msg: 'asche', data: getAll });
  } catch (error) {
    res.status(400).send({ msg: 'error hoise', error: error.message });
  }
}
async function updateCategory(req, res) {
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
    let { changeName, ChangeDescription } = req.body;
    let updateCat = await categoryModel.findOneAndUpdate(
      { _id: id },
      { name: changeName, description: ChangeDescription, Image: fileNames },
      { new: true }
    );
    if (!updateCat) {
      return res.status(404).send({ msg: 'Category not found' });
    }
    await updateCat.save();
    res.send({ msg: 'update hoise', data: updateCat });
  } catch (error) {
    res.status(400).send({ msg: 'error hoise', error: error.message });
  }
}
module.exports = {
  categoryControll,
  deleteCategory,
  getAllCategories,
  updateCategory,
};

const productSchema = require('../Model/productSchema');

async function productControll(req, res) {
  try {
    let { name, description, price,category} = req.body;
     let fileName = req.files[0].filename;
    let prodrcts = new productSchema({
      name,
      description,
      price,
      category,
      Photo: process.env.local_host + fileName,
    });
    await prodrcts.save();
    res.status(201).send({msg:'products created',prodrcts})
  } catch (error) {
    res.status(400).send({ msg: 'error', error });
  }
}
module.exports = productControll;

// cetegory te product id jai nah
// image jodi folder modhe same thke tahole same image upload hote dibo nH
// image onk gulo hole array formet a database kivhave nivo
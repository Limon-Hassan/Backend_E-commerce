const cartModel = require('../Model/cartModel');

async function cartadd(req, res) {
  let { price, quantity, product, user } = req.body;
  try {
    let carts = new cartModel({
      price,
      quantity,
      product,
      user,
    });
    await carts.save();
    res.send({ msg: 'success', data: carts });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'error found' });
  }
}
module.exports = { cartadd };

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

async function getCart(req, res) {
  try {
    let { id } = req.params;
    let seecart = await cartModel.find({ user: id });

    if (seecart && seecart.length > 0) {
      res.send(seecart);
    } else {
      res.status(404).send({ msg: 'Cart not found for this user' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'Error found' });
  }
}

async function DeleteCart(req, res) {
  try {
    let { id } = req.params;
    let deleteCart = await cartModel.findOneAndDelete({ _id: id });
    res.send({ msg: 'delete successfully', data: deleteCart });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'error found' });
  }
}

async function IncrementCart(req, res) {
  try {
    let { id } = req.params;
    let { action } = req.query;

    let cartItem = await cartModel.findOne({ _id: id }).populate('product');

    if (action === 'increment') {
      if (cartItem.quantity >= 10) {
        return res.status(400).send({ msg: 'Max quantity of 10 reached' });
      }
      if (cartItem.quantity >= cartItem.product.stock) {
        return res.status(400).send({ msg: 'Not enough stock available' });
      } else {
        cartItem.quantity++;
      }
    } else if (action === 'decrement' && cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      return res
        .status(400)
        .send({ msg: 'Invalid action or quantity cannot go below 1' });
    }

    await cartItem.save();
    res.send(cartItem);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'An error occurred while updating the cart' });
  }
}

module.exports = { cartadd, getCart, DeleteCart, IncrementCart };

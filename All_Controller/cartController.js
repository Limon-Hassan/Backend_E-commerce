const cartModel = require('../Model/cartModel');
const productSchema = require('../Model/productSchema');

async function cartadd(req, res) {
  const { quantity, product, user } = req.body;

  try {
    // Check if the product exists
    const productExists = await productSchema.findById({ _id: product });
    if (!productExists) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check if the user already has this product in their cart
    const existingCartItem = await cartModel.findOne({
      user: user,
      product: product,
    });

    if (existingCartItem) {
      // If the product is already in the cart, return an error message
      return res
        .status(400)
        .json({ msg: 'This product is already in your cart' });
    }

    // If the product doesn't exist in the cart, create a new cart item
    const qty = quantity || 1;
    const totalPrice = productExists.price * qty;

    let newCart = new cartModel({
      totalPrice,
      quantity: qty,
      product,
      user,
    });

    await newCart.save();
    res.json({ msg: 'Cart item added successfully', data: newCart });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'Error adding item to cart', error: error.message });
  }
}

async function getCart(req, res) {
  try {
    let { id } = req.params;
    let seecart = await cartModel.find({ user: id }).populate('product');
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
    const { id } = req.params;
    const { action } = req.query;


    console.log('Incoming request:');
    console.log('ID from params:', req.params.cartId);
    console.log('Action from query:', req.query.action);


    let cartItem = await cartModel.findOne({ _id: id }).populate('product');
    if (!cartItem) {
      return res.status(404).send({ msg: 'Cart item not found' });
    }

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
    res.status(200).json({
      msg: `Cart ${
        action === 'increment' ? 'incremented' : 'decremented'
      } successfully`,
      data: cartItem,
    });
  } catch (error) {
    console.error('IncrementCart ERROR:', error); // ✅ See actual error in console
    res
      .status(500)
      .send({ msg: 'An error occurred while updating the cart', error });
  }
}

module.exports = { cartadd, getCart, DeleteCart, IncrementCart };

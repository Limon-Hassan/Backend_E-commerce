const cartModel = require('../Model/cartModel');
const productSchema = require('../Model/productSchema');

async function cartadd(req, res) {
  const { quantity, product, user } = req.body;

  try {
    const productExists = await productSchema.findById({ _id: product });
    if (!productExists) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const existingCartItem = await cartModel.findOne({
      user: user,
      product: product,
    });

    if (existingCartItem) {
      return res
        .status(400)
        .json({ msg: 'This product is already in your cart' });
    }

    const qty = quantity || 1;
    const additionalFees = 100;

    const OrginalPrice = productExists.price * qty;
    const totalPrice = OrginalPrice + additionalFees;

    let newCart = new cartModel({
      totalPrice,
      OrginalPrice,
      quantity: qty,
      additionalFees,
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
      let originalPrice = 0;
      let additionalFees = 0;

      seecart.forEach(item => {
        const productPrice = item.product[0]?.price || 0;
        const quantity = item.quantity || 1;
        const fees = item.additionalFees || 0;

        originalPrice += productPrice * quantity;
        additionalFees += fees;
      });

      const totalPrice = originalPrice + additionalFees;

      res.send({
        cartItems: seecart,
        summary: {
          originalPrice,
          additionalFees,
          totalPrice,
        },
      });
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

    let cartItem = await cartModel
      .findOne({ _id: id })
      .populate({ path: 'product', select: 'price' });
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

    const productPrice = cartItem.product[0]?.price || 0;
    const quantity = cartItem.quantity || 1;
    const additionalFees = cartItem.additionalFees ?? 100;
    const originalPrice = productPrice * cartItem.quantity;
    const totalPrice = originalPrice + additionalFees;

    if (!isNaN(originalPrice) && !isNaN(totalPrice)) {
      cartItem.originalPrice = originalPrice;
      cartItem.totalPrice = totalPrice;
    } else {
      return res.status(500).json({
        msg: 'Invalid price calculation',
        debug: { productPrice, quantity, additionalFees },
      });
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

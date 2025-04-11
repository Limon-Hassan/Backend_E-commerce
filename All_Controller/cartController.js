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
    const subTotal = OrginalPrice;

    const shippingCost = subTotal >= 5000 ? 0 : 200;
    const discount = qty > 10 ? subTotal * 0.05 : 0;
    const totalPrice = subTotal + additionalFees + shippingCost - discount;
    let newCart = new cartModel({
      totalPrice,
      OrginalPrice,
      subTotal,
      quantity: qty,
      additionalFees,
      product,
      shippingCost,
      discount,
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

async function getcartInfo(req, res) {
  try {
    const userId = req.params.id;

    const cartItems = await cartModel
      .find({ user: userId })
      .populate('product', 'name price Photo'); 

    if (cartItems.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    const productsInCart = cartItems.map(item => ({
      cartItemId: item._id,
      product: item.product,
      quantity: item.quantity,
      price: item.product.price, 
    }));

    res.status(200).json({
      msg: 'Cart products fetched successfully',
      cartItems: productsInCart,
    });
  } catch (error) {
    console.log('Error fetching cart products:', error);
    res.status(500).json({
      msg: 'Error fetching cart products',
      error: error.message,
    });
  }
}

async function getCartSummery(req, res) {
  try {
    const userId = req.params.id;

    const cartItems = await cartModel
      .find({ user: userId })
      .populate('product');

    if (cartItems.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    let originalPrice = 0;
    let totalQuantity = 0;
    const additionalFees = 100;

    cartItems.forEach(item => {
      const productPrice = item.product?.price || 0;
      const quantity = item.quantity || 1;

      originalPrice += productPrice * quantity;
      totalQuantity += quantity;
    });

    let shippingCost = 200;
    if (originalPrice >= 5000) {
      shippingCost = 0;
    }

    const subTotal = originalPrice + shippingCost + additionalFees;

    let discount = 0;
    if (totalQuantity > 10) {
      discount = subTotal * 0.05;
    }

    const totalPrice = subTotal - discount;

    const summary = {
      originalPrice, 
      additionalFees, 
      subTotal, 
      shippingCost, 
      discount,
      totalPrice, 
      totalQuantity,
    };

    res.status(200).json({
      msg: 'Cart summary fetched successfully',
      summary,
    });
  } catch (error) {
    console.log('Error fetching cart summary:', error);
    res
      .status(500)
      .json({ msg: 'Error fetching cart summary', error: error.message });
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
      .populate({ path: 'product', select: 'price stock' });

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
    }
    else if (action === 'decrement' && cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      return res
        .status(400)
        .send({ msg: 'Invalid action or quantity cannot go below 1' });
    }

    const productPrice = cartItem.product?.price || 0;
    const quantity = cartItem.quantity || 1;
    const additionalFees = cartItem.additionalFees || 100; 
    const originalPrice = productPrice * quantity;

    const shippingCost = cartItem.shippingCost || 0;
    const discount = cartItem.discount || 0;

    
    const subTotal = originalPrice + additionalFees;

    const totalPrice = subTotal + shippingCost - discount;

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
    console.error('IncrementCart ERROR:', error); 
    res
      .status(500)
      .send({ msg: 'An error occurred while updating the cart', error });
  }
}

module.exports = {
  cartadd,
  getCartSummery,
  getcartInfo,
  DeleteCart,
  IncrementCart,
};

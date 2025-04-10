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

async function getCart(req, res) {
  try {
    let { id } = req.params;
    let seecart = await cartModel.find({ user: id }).populate('product'); // Populate product details

    if (seecart && seecart.length > 0) {
      let originalPrice = 0;
      let additionalFees = 0;
      let totalQuantity = 0; // Track total quantity to check for discounts

      seecart.forEach(item => {
        const productPrice = item.product[0]?.price || 0;
        const quantity = item.quantity || 1;
        const fees = item.additionalFees || 0;

        // Add product price * quantity to originalPrice
        originalPrice += productPrice * quantity;
        additionalFees += fees;
        totalQuantity += quantity; // Sum up all the quantities
      });

      // Calculate subTotal (originalPrice + additionalFees)
      const subTotal = originalPrice + additionalFees;

      // Apply shipping cost based on conditions (Free if subTotal > 5000)
      let shippingCost = 200; // Default shipping cost
      if (subTotal >= 5000) {
        shippingCost = 0; // Free shipping if total price > 5000
      }

      // Apply discount if quantity > 10 (5% discount on subTotal)
      let discount = 0;
      if (totalQuantity > 10) {
        discount = subTotal * 0.05; // 5% discount for total quantity > 10
      }

      // Calculate final total price
      const totalPrice = subTotal + shippingCost - discount;

      // Response with cart items and the summary
      res.send({
        cartItems: seecart,
        summary: {
          originalPrice,
          additionalFees,
          subTotal,
          shippingCost,
          discount,
          totalPrice,
        },
      });
    } else {
      res.status(404).send({ msg: 'Cart not found for this user' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'Error found', error });
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

    // Action: Increment quantity
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
    // Action: Decrement quantity
    else if (action === 'decrement' && cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      return res
        .status(400)
        .send({ msg: 'Invalid action or quantity cannot go below 1' });
    }

    const productPrice = cartItem.product?.price || 0;
    const quantity = cartItem.quantity || 1;
    const additionalFees = cartItem.additionalFees || 100; // You can adjust this fee as per your business logic
    const originalPrice = productPrice * quantity;

    // Assuming shipping cost and discount are stored as part of the cart model.
    const shippingCost = cartItem.shippingCost || 0;
    const discount = cartItem.discount || 0;

    // Calculate subtotal before shipping and discount
    const subTotal = originalPrice + additionalFees;

    // Final total price including shipping cost and discount
    const totalPrice = subTotal + shippingCost - discount;

    // Ensure all calculations are valid
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

const cartModel = require('../Model/cartModel');
const checkoutModel = require('../Model/checkoutModel');

async function checkoutCart(req, res) {
  try {
    const { user, address, city, phone, email } = req.body;

    // Fetch user's cart items
    const cartItems = await cartModel.find({ user }).populate('product');

    if (cartItems.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    let totalQuantity = 0;
    let totalPrice = 0;
    // cartItems.forEach(item => {
    //   console.log('Product Price:', item.product[0].price);
    // });
    // return;
    const items = cartItems.map(item => {
      if (!item.product || item.product.length === 0) {
        throw new Error('Product is missing in cart');
      }

      totalQuantity += item.quantity;

      // Get total price from all products in the array
      const productPrice = item.product.reduce(
        (acc, prod) => acc + (prod.price || 0),
        0
      );
      totalPrice += item.quantity * productPrice;

      return {
        product: item.product.map(p => p._id), // Store all product IDs
        quantity: item.quantity,
        price: productPrice, // Store the total product price
      };
    });
    // Apply bulk discount (if applicable)
    if (totalQuantity > 10) {
      totalPrice *= 0.95; // 5% discount for bulk orders
    }

    // Optional: Add shipping cost if order total is below a threshold
    const shippingCost = totalPrice > 5000 ? 0 : 200;
    totalPrice += shippingCost;

    // Ensure totalPrice is a valid number
    if (isNaN(totalPrice)) {
      throw new Error('Invalid total price calculation');
    }

    // Create order
    const newOrder = new checkoutModel({
      user,
      cartItems: items,
      totalQuantity,
      totalPrice,
      address,
      city,
      phone,
      email,
      paymentStatus: 'pending',
      delivery: 'pending',
    });

    await newOrder.save();

    await cartModel.deleteMany({ user });

    res.status(201).json({ msg: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.log('Checkout Error:', error);
    res
      .status(500)
      .json({ msg: 'Error processing checkout', error: error.message });
  }
}

module.exports = { checkoutCart };

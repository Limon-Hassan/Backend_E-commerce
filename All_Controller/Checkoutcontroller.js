const cartModel = require('../Model/cartModel');
const checkoutModel = require('../Model/checkoutModel');
const userSchema = require('../Model/userSchema');

async function checkoutCart(req, res) {
  try {
    const { user, address, city, phone, email, paymentMethod } = req.body;

    const cartItems = await cartModel.find({ user }).populate('product');

    if (cartItems.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    let totalQuantity = 0;
    let totalPrice = 0;

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
      paymentMethod,
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
async function updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { action } = req.body;

    // Find the order and populate user details
    let order = await checkoutModel.findOne(orderId).populate('user');
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Extract user role from populated user data
    const userRole = order.user.role; // Now we get the role

    // If the logged-in user is requesting cancellation
    if (userRole === 'user' && action === 'request') {
      order.delivery = 'cancellation_requested';
    }

    // If an admin is approving or rejecting the request
    if (userRole === 'admin') {
      if (action === 'approve') {
        order.delivery = 'cancelled';
      } else if (action === 'reject') {
        order.delivery = 'pending'; // Revert back if rejected
      } else {
        return res.status(400).json({ msg: 'Invalid admin action' });
      }
    }

    await order.save();
    res.json({ msg: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ msg: 'Error updating order', error: error.message });
  }
}

async function Getcheckout(req, res) {

  
}
async function Deletecheckout(req, res) {}

module.exports = {
  checkoutCart,
  updateOrderStatus,
  Getcheckout,
  Deletecheckout,
};

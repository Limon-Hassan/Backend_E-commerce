const cartModel = require('../Model/cartModel');
const checkoutModel = require('../Model/checkoutModel');
const userSchema = require('../Model/userSchema');

async function checkoutCart(req, res) {
  try {
    const { name, address, Apartment, city, phone, email, paymentMethod } =
      req.body;
    const userid = req.params.id;

    const cartItems = await cartModel.find({ user: userid });

    if (cartItems.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    const items = cartItems.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.totalPrice,
    }));

    const newOrder = new checkoutModel({
      user: userid,
      cartItems: items,
      address,
      city,
      name,
      Apartment,
      phone,
      email,
      paymentMethod,
      paymentStatus: 'pending',
      delivery: 'pending',
    });

    await newOrder.save();
    // await cartModel.deleteMany({ user: userid });

    res.status(201).json({
      msg: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    console.log('Checkout Error:', error);
    res.status(500).json({
      msg: 'Error processing checkout',
      error: error.message,
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { action } = req.body;

    let order = await checkoutModel.findOne(orderId).populate('user');
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    const userRole = order.user.role;

    if (userRole === 'user' && action === 'request') {
      order.delivery = 'cancellation_requested';
    }

    if (userRole === 'admin') {
      if (action === 'approve') {
        order.delivery = 'cancelled';
      } else if (action === 'reject') {
        order.delivery = 'pending';
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
  try {
    const orderId = req.params.orderId; 

    const order = await checkoutModel
      .findById(orderId)
      .populate('cartItems.product');

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Extract order summary details
    const { totalQuantity, totalPrice, discount, shippingCost, cartItems } =
      order;

    res.json({
      orderSummary: {
        totalQuantity,
        totalPrice,
        discount,
        shippingCost,
        cartItems, // Full cart items data with products
      },
    });
  } catch (error) {
    console.log('Error fetching order summary:', error);
    res
      .status(500)
      .json({ msg: 'Error fetching order summary', error: error.message });
  }
}

async function Deletecheckout(req, res) {}

module.exports = {
  checkoutCart,
  updateOrderStatus,
  Getcheckout,
  Deletecheckout,
};

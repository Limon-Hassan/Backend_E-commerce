const cartModel = require('../Model/cartModel');
const checkoutModel = require('../Model/checkoutModel');
const userSchema = require('../Model/userSchema');


async function checkoutCart(req, res) {
  try {
    const { name, address, Apartment, city, phone, email, paymentMethod } =
      req.body;
    const userid = req.params.id;

    const cartItems = await cartModel
      .find({ user: userid })
      .populate('product');


    if (cartItems.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    let originalPrice = 0;
    let additionalFees = 0;
    let totalQuantity = 0;

    cartItems.forEach(item => {
      const productPrice = item.product?.price || 0;
      const quantity = item.quantity || 1;
      const fees = item.additionalFees || 0;

      originalPrice += productPrice * quantity;
      additionalFees += fees;
      totalQuantity += quantity;
    });

    const subTotal = originalPrice + additionalFees;

    let shippingCost = 200; 
    if (subTotal >= 5000) {
      shippingCost = 0; 
    }

    let discount = 0;
    if (totalQuantity > 10) {
      discount = subTotal * 0.05; 
    }

    const totalPrice = subTotal + shippingCost - discount;

    const items = cartItems.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const newOrder = new checkoutModel({
      user: userid,
      cartItems: items,
      totalQuantity,
      totalPrice,
      discount,
      shippingCost,
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

    await cartModel.deleteMany({ user: userid });

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
    const orderId = req.query.orderId;

    const order = await checkoutModel
      .findById(orderId)
      .populate('cartItems.product');

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json({
      orderSummary: {
        totalQuantity: order.totalQuantity,
        subTotal: order.totalPrice - order.shippingCost + order.discount,
        discount: order.discount,
        shippingCost: order.shippingCost,
        totalPrice: order.totalPrice,
        cartItems: order.cartItems.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price,
          subTotal: item.price, 
        })),
      },
    });
  } catch (error) {
    console.log('Error fetching order summary:', error);
    res.status(500).json({
      msg: 'Error fetching order summary',
      error: error.message,
    });
  }
}

async function Deletecheckout(req, res) {}

module.exports = {
  checkoutCart,
  updateOrderStatus,
  Getcheckout,
  Deletecheckout,
};

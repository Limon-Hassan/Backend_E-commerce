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

      const productPrice = item.product.reduce(
        (acc, prod) => acc + (prod.price || 0),
        0
      );
      totalPrice += item.quantity * productPrice;

      return {
        product: item.product.map(p => p._id), 
        quantity: item.quantity,
        price: productPrice,
      };
    });
    if (totalQuantity > 10) {
      totalPrice *= 0.95; 
    }

    const shippingCost = totalPrice > 5000 ? 0 : 200;
    totalPrice += shippingCost;
    if (isNaN(totalPrice)) {
      throw new Error('Invalid total price calculation');
    }

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

  
}
async function Deletecheckout(req, res) {}

module.exports = {
  checkoutCart,
  updateOrderStatus,
  Getcheckout,
  Deletecheckout,
};

const { mongoose, Schema } = require('mongoose');

let checkoutModel = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid', 'pending', 'failed', 'cancelled'],
      default: 'unpaid',
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'returned'],
      default: 'pending',
    },
    estimatedDelivery: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', checkoutModel);

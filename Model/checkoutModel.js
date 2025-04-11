const { mongoose, Schema } = require('mongoose');

let checkoutModel = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      default: 0,
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
    name: {
      type: String,
      require: true,
      trim: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cash on delivery', 'debit card', 'bkash', 'nogod'],
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
      enum: [
        'pending',
        'shipped',
        'delivered',
        'cancelled',
        'cancellation_requested',
      ],
      default: 'pending',
    },
    estimatedDelivery: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', checkoutModel);

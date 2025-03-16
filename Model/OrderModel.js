let { mongoose, Schema } = require('mongoose');

let cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    Totalprice: {
      type: Number,
    },
    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
      },
    ],
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid', 'pending', 'failed', 'cancelled'],
      default: 'unpaid',
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
    },
    delivery: {
      type: String,
      enum: [
        'pending',
        'shipped',
        'delivered',
        'returned',
      ],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', cartSchema);

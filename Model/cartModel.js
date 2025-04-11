let { mongoose, Schema } = require('mongoose');

let cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    OrginalPrice: {
      type: Number,
      require: true,
    },
    additionalFees: {
      type: Number,
      require: true,
      default: 0,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      require: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cart', cartSchema);

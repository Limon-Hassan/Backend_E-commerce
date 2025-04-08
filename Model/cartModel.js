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
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        require: true,
      },
    ],
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

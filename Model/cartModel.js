let { mongoose, Schema } = require('mongoose');

let cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
    quantity: {
      type: Number,
      require: true,
      default: 1,
    },
    price: {
      type: Number,
    },
    // product: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'products',
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cart', cartSchema);

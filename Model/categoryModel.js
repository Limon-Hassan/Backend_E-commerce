let { mongoose, Schema } = require('mongoose');

let categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required'],
    },
    description: {
      type: String,
    },
    review: {
      type: String,
    },
    Image: {
      type: String,
      require: [true, 'image field require'],
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', categorySchema);

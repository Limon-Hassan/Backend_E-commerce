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
      require: true,
    },
    review: {
      type: String,
    },
    Image: {
      type: Array,
      require: [true, 'image field require'],
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', categorySchema);

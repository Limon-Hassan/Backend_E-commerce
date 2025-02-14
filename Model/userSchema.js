let { mongoose, Schema } = require('mongoose');

let userModel = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email already Teken'],
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
    },
    phone: {
      type: String,
    },
    adress: {
      type: String,
    },
    Image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userModel);

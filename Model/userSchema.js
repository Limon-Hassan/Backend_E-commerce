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
      trim: true,
      unique: [true, 'Email already Teken'],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'password would be 8 cherekter'],
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
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userModel);

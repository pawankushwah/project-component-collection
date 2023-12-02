const mongoose = require("mongoose");

export const courses = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  numberOfRating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true
}
});

export const users = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: function () {
      return this.mobile ? false : true;
    },
  },
  mobile: {
    type: Number,
    required: function () {
      return this.email ? false : true;
    },
  },
  password: {
    type: String,
    required: true,
  },
  cart: Array
});

export const sessionToken = new mongoose.Schema({
  accessToken: {
    type: Array,
    required: [true, "Token is required"],
    unique:true
  },
  refreshToken: {
    type: String,
    required: [true, "Refresh Token is required"],
    unique:true
  },
  blackListedToken: {
    type: Array,
    required: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"]
  }
});
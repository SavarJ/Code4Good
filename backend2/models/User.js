const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  fname: {
    type: String,
    required: true,
    minlength: 3,
  },
  lname: {
    type: String,
    required: true,
    minlength: 3,
  },
  dob: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
  },
  isTutor: {
    type: Boolean,
    required: true,
  },
  zoom: {
    type: String,
    required: false,
  },
  points: {
    type: Number,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  rating: {
    type: Array,
    required: true,
  },
  profileLink: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

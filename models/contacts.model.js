const mongoose = require("mongoose");
const { Schema } = mongoose;

const users = new Schema ({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
})

const contact = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  })
const Contact = mongoose.model('contact', contact, "contacts")
const Users = mongoose.model('users', users, "users")

  module.exports = Contact, Users;
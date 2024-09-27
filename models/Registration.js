const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
  },

  registrationNumber: {
    type: String,
    required: [true, "Registration number is required"],
    unique: true,
  },

  transactionNumber: {
    type: String,
    required: [true, "Transaction number is required"],
    unique: true,
  },

  referralId: {
    type: String,
  },

  paymentSS: {
    type: String,
  },

  attended: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);

module.exports = Registration;

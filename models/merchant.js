const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const merchantSchema = new mongoose.Schema(
  {
    gstNo: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    companyBankAccDetails: {
      type: String,
      trim: true,
    },
    companyPhoneNo: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    uid: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;

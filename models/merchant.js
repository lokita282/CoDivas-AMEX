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
    bankAccountDetails: {
      type: Object,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "health",
        "agriculture",
        "education",
        "food",
        "housing",
        "transportation",
        "utility",
        "telecommunication",
        "other",
      ],
      required: true,
      trim: true,
    },
    uid: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;

const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    startsAt: {
      type: Date,
      required: true,
    },
    endsAt: {
      type: Date,
      required: true,
    },
    issuedBy: {
      type: String,
      required: true,
      trim: true,
    },
    issuedByLogo: {
      type: String,
      required: true,
      trim: true,
    },
    beneficiaryName: {
      type: String,
      required: true,
      trim: true,
    },
    beneficiaryPhone: {
      type: String,
      required: true,
      trim: true,
    },
    govtIdType: {
      type: String,
      required: true,
      enum: ["aadhar", "pan"],
    },
    govtIdNumber: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
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
    },
    categoryLogo: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    useType: {
      type: String,
      enum: ["single", "multiple"],
    },
    uid: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["upcoming", "valid", "expired", "redeemed", "revoked"],
    }
  },
  { timestamps: true }
);

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    datetime: {
      type: Date,
      required: true
    },
    voucherUid: {
      type: String,
      required: true,
      trim: true
    },
    voucherTitle: {
      type: String,
      trim: true
    },
    amount: {
      type: String,
      required: true
    },
    payee: {
      type: String,
      required: true,
      trim: true
    },
    payeePhone: {
      type: String,
      required: true,
      trim: true
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
      required: true
    },
    beneficiaryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beneficiary",
      required: true
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Voucher = new Schema(
  {
    currentCode: String,
    description: String,
    discount: Number,
    type: Numer, // 1: money, 2: percent
    exp: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("voucher", Voucher);

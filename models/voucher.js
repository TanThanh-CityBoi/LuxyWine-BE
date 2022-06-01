const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Voucher = new Schema(
  {
    code: String,
    description: String,
    amount: Number,
    limit: Number,
    type: Numer, // 1: money, 2: percent
    isPublic: Boolean,
    users: [{ type: Schema.Types.ObjectId, ref: "user" }],
    isEnable: Boolean,
    quantity: Number,
    exp: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("voucher", Voucher);

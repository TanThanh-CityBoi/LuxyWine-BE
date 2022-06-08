const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Receipt = new Schema(
  {
    creater: { type: Schema.Types.ObjectId, ref: "user" }, // ID người tạo, nullable
    receiver: {
      name: String,
      phoneNumber: String, // required
      province: {},
      district: {},
      ward: {},
      description: String,
      note: String,
    }, // Tên và địa chỉ người nhận hàng.
    voucher: { type: Schema.Types.ObjectId, ref: "voucher" }, // Object id của voucher.
    cart: [],
    totalPrice: Number,
    profit: Number,
    status: Number, //0: bị hủy, 1: chờ xác nhận, 2: đã xác nhận, 3: đang giao. 4: đã nhận hàng, 6: boom hàng
    payMethod: Number, // 1: trả trước, 3: trả sau
  },
  { timestamps: true }
);

module.exports = mongoose.model("receipt", Receipt);

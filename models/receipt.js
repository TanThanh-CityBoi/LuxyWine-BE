const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Receipt = new Schema({
  customerID: String, // ID khách hàng, nullable
  receiver: {
    name: String,
    email: String,
    phoneNumber: String, // required
    address: { name: String, ward: String, district: String, convine: String },
  }, // Tên và địa chỉ người nhận hàng.
 // voucherID: [String], xem xét sau
  totalPrice: Number,
  profit: Number,
  staff: { id: String, name: String },
  status: Number, //0: bị hủy, 1: chờ xác nhận, 2: đã xác nhận, 3: đang giao. 4: đã giao, 5: hoàn thành, 6: boom hàng
  payMethod: Boolean, // 1: thẻ, 2: momo, 3: sau
});

module.exports = mongoose.model("Receipt", Receipt);

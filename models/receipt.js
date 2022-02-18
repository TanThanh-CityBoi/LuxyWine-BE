
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Receipt = new Schema({
    customerID: String, // ID khách hàng, nullable
    receiver: { name: String, address: { name: String, ward: String, district: String, city: String } }, // Tên và địa chỉ người nhận hàng.
    voucherID: [String],
    totalPrice: Number,
    profit: Number,
    staff: { id: String, name: String},
    shipingStatus: Number, //0: bị hủy, 1: chờ xác nhận, 2: đã xác nhận, 3: đang giao. 4: đã giao, 5: hoàn thành, 6: boom hàng
    paid: Boolean, // true: đã thanh toán, false: chưa thanh toán.
});

module.exports = mongoose.model("Receipt", Receipt);
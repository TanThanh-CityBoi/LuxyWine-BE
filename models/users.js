const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: String,
    phone: String,
    role: String,
    mail: String,
    emailVerified: Boolean,
    address: [
      {
        district: String, // Quận
        province: String, // Tỉnh/TP
        ward: String, // Phường
        description: String, // Địa chỉ cụ thể
      },
    ],
    avatar: String,
    birthday: Date,
    cart: [
      {
        count: Number,
        productId: "",
      },
    ],
    receipts: [], // lấy lịch sử mua hàng
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;

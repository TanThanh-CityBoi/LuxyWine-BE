const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String, // Tên sản phẩm
  sku: String, // Mã sản phẩm
  aboutProduct: String, // Một đoạn ngắn mô tả thông tin sản phẩm
  avtURL: String, // Hình đại diện sản phẩm
  imgURLs: [String], // Các ảnh kèm theo
  quantity: Number, // Số lượng
  importPrice: Number, // Giá nhập
  sellPrice: Number, // Giá bán gốc
  discountPrice: Number, // Giá bán đã sale
  temperature: { minimum: Number, maximum: Number }, // Nhiệt độ sử dụng
  color: String, // Màu sắc của rượu
  food: [String], // Các thức ăn kèm, lưu String là tên như dưới
  /*
   1 - Phô mai 
   2 - Bánh ngọt
   3 - Thịt bò
   4 - Thịt gà
   5 - Thịt lợn
   6 - Thịt vịt
   7 - Rau củ quả
   8 - Hải sản
   9 - Thịt thỏ
   10 - Thịt cừu
   Gồm những loại này nha fen :3 sẽ có icon riêng cho từng sản phẩm cho đẹp
   */

  origin: String, // Xuất xứ
  producer: String, //Nhà sản xuất
  concentrationPercent: Number, //  nồng độ cồn ( tính theo %)
  capacity: Number, // Dung tích (ml)
  vintage: Number, // Năm sản xuất
  sugar: Number, // Hàm lượng đường
  experation: Date,
  productType: String, // wine/combo/accessory,
  isSpecial: Boolean, // :à sản phẩm đặc biệt
  isNew: Boolean, // là sản phẩm mới
  hasSold: Number, // số lượng sản phẩm đã bán
  
});

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;

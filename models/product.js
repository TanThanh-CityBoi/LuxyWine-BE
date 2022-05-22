
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
   name: String,
   avtURL: String,
   imgURLs: [String],
   quantity: Number,
   importPrice: Number, // Giá nhập
   sellPrice: Number, // Giá bán gốc
   discountPrice: Number, // Giá bán đã sale
   temperature: { minimum: Number, maximum: Number }, // Nhiệt độ sử dụng
   color: [String],
   food: [String],
   origin: String, // Xuất xứ
   producer: String, //Nhà sản xuất
   concentrationPercent: Number, //  nồng độ cồn ( tính theo %)
   capacity: Number, // Dung tích (ml)
   vintage: Number, // Năm sản xuất
   aboutProduct: String, // Một đoạn ngắn mô tả thông tin sản phẩm
   suger: Number, // Hàm lượng đường
   experation: Date,
   productType: String // wine/combo/accessory
});


const Product = mongoose.model('products', ProductSchema);
module.exports = Product;
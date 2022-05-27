const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Banner = new Schema({
  slides: [{ avtUrl: String, title: String, description: String }], // Danh sách các hình 
  type: Number // 1: Home ,
});

module.exports = mongoose.model("Banner", Banner);

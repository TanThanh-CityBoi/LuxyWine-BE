
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Banner = new Schema({
    avtUrl: String,
    title: String,
    description: String,
    views: Number,
    content: String
});

module.exports = mongoose.model("Banner", Banner);
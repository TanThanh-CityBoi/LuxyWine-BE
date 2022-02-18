
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema({
    avtUrl: String,
    title: String,
    description: String,
    views: Number,
    content: String
});

module.exports = mongoose.model("News", News);
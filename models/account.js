
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    email: String,//email
    password: String, // đã hash
    role: String, // customer,staff,manager
    phoneNumber: String,
    avtURL: String, // URL avatar
    address: String,
    id: String,
});

module.exports = mongoose.model("Account", Account);
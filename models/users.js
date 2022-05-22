const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
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
    avatar: String,
    birthday: Date,
},
    { timestamps: true }
);

const User = mongoose.model('user', UserSchema);
module.exports = User;
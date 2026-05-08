const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: [true, "password is required"],
    }
})
const userModel = mongoose.model("users", userSchema);

module.exports = userModel
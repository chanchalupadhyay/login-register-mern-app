const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    password: {
        type: String,
        required: "password is required"

    },
    email: {
        type: String,
        required: "email is required"
    },
    phone_number: {
        type: Number,
    },

})

module.exports = mongoose.model("user", userSchema);
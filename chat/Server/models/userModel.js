const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String
    },
    avatar_img: {
        type: String,
        default: 'profile_default.png'
    }
})

module.exports = mongoose.model("users", usersSchema)
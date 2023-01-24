const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String
    },
    friends: {
        type: mongoose.Schema.Types.Array
    },
    avatar_img: {
        type: String,
        default: 'profile_default.png'
    }
})

module.exports = mongoose.model("users", usersSchema)
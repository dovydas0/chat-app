const mongoose = require('mongoose')

const messagesSchema = new mongoose.Schema({
    message: {
        type: String
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId
    }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("messages", messagesSchema)
const mongoose = require("mongoose");
const User = require("./user")

const commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("comment", commentSchema);
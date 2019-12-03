const mongoose = require("mongoose");

const postCard = new mongoose.Schema({
    image: String,
    nights: String,
    price: String,
    location: String,
    hotel: String,
    flight: String,
    desc: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("deal", postCard);
const mongoose = require("mongoose");

const memeSchema = mongoose.Schema({
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: true
    },
    description: String,
    tags: [String]
});

module.exports = mongoose.model('Meme', memeSchema);
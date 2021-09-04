const mongoose = require("mongoose");

// Comment Schema
const CommentSchema = mongoose.Schema({
    file: { type: mongoose.Schema.Types.ObjectId, ref: "File", required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    title: { type: String, required: false },
    body: { type: String, required: false },
    allowComments: { type: Boolean, required: true, default: true },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);



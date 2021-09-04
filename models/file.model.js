const mongoose = require("mongoose");

// User Schema
const FileSchema = mongoose.Schema({
    fileName: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    password: { type: String, required: false },
    hidden: {type: Boolean, required: false, default: false },
    approved: {type: Boolean, required: true, default: false },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: false,
        default: []
    }]
}, { timestamps: true });

FileSchema.methods.addComment = function (cid) {
    this.comments.push(cid);
    this.save();
}

module.exports = mongoose.model('File', FileSchema);

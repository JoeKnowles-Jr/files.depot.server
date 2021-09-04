const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

// User Schema
const UserSchema = mongoose.Schema({
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    needsPwUpdate: {type: Boolean, required: false},
    role: {type: String, required: false},
    addedFiles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File", 
        required: false,
        default: []
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", 
        required: false,
        default: []
    }]
}, {timestamps: true});

UserSchema.pre('save', function (next) {
    const user = this;

    bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        next();
    });

});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);

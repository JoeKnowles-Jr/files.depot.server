
const Comment = require('../models/comment');

exports.getAllComments = (req, res) => {
    Comment.find({}, (err, result) => {
        if (err) { res.json(err); }
        res.json(result);
    });
};

exports.getFileComments = (req, res) => {
    const { fid } = req.body;
    Comment.find({file: fid})
        .then((err, comments) => {
            if (err) { res.json(err); }
            res.json(data);
        })
        .catch(err => res.json(err))
};

exports.getUserComments = (req, res) => {
    const { uid } = req.body;
    Comment.find({ user: uid })
        .then((err, comments) => {
            if (err) { res.json(err); }
            res.json(data);
        })
        .catch(err => res.json(err))
};

exports.addComment = (req, res) => {
    const comment = new Comment(req.body);
    comment.save().then((err, doc) => {
        if (err) { res.json(err); }
        res.json(doc);
    });
};



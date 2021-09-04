const fs = require('fs');
const Meme = require('../models/meme.model');

exports.getMemes = (req, res) => {
    Meme.find({}).populate('file')
        .then((result) => {
            res.json({memes: result});
        })
        .catch((err) => { res.json(err); });
};

exports.addMeme = (req, res) => {
    const meme = new Meme(req.body);
    meme.save().then(() => {
        res.json({ message: "success" });
    })
        .catch(err => res.json({ message: err }));
};

exports.deleteMeme = (req, res) => {
    Meme.findByIdAndDelete(req.params.mid)
        .then(() => {
            res.json({ message: "success" });
        })
        .catch(err => res.json({ message: err }));
};

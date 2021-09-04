const fs = require('fs');
const File = require('../models/file.model');
const Comment = require('../models/comment');

const CONTENT_DIR = __dirname + '/../files/content';
const UPLOADS_DIR = __dirname + '/../files/uploads';
const MEMES_DIR = __dirname + '/../files/memes';

exports.getFileList = (req, res) => {
    File.find({}).populate('addedBy').populate('comments')
        .then((result) => {
            res.json(result);
        })
        .catch((err) => { res.json(err); });
};

exports.getContentFiles = (req, res) => {
    fs.readdir(CONTENT_DIR, (err, files) => {
        if (err) {
            throw err;
        }
        res.json(files);
    });
};

exports.getUploadFiles = (req, res) => {
    fs.readdir(UPLOADS_DIR, (err, files) => {
        if (err) {
            throw err;
        }
        res.json(files);
    });
};

exports.uploadFile = (req, res) => {
    let uploadedFile;
    let uploadPath;
    const { uid, password, comment, hidden, type } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    uploadedFile = req.files.file;

    const destination =
        type === 'meme' ?
            './files/memes/'
            :
            type === 'approved' ?
                './files/content/'
                :
                './files/uploads';
    

    uploadPath = destination + uploadedFile.name;

    uploadedFile.mv(uploadPath, function (err) {
        if (err) {
            return res.send(err);
        }

        File.create({
            fileName: uploadedFile.name,
            addedBy: uid,
            password: password,
            hidden: hidden
        })
        .then(f => {
            Comment.create({
                file: f._id,
                user: uid,
                title: "UPLOAD",
                body: comment,
                allowComments: true
            })
            .then(c => {
                f.addComment(c._id);
                res.json({
                    newFile: f,
                    message: uploadedFile.name + ' was uploaded to ' + uploadPath
                })
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.send(err));
    });
};

exports.addFile = (req, res) => {
    const file = new File(req.body);
    file.save().then(() => {
        res.json({ message: "success" });
    })
        .catch(err => res.json({ message: err}));
};

exports.deleteFile = (req, res) => {
    File.findByIdAndDelete(req.params.fid)
        .then(() => {
            res.json({ message: "success" });
        })
        .catch(err => res.json({ message: err }));
};

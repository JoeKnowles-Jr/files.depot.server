const Authentication = require('./controllers/authentication');
const Files = require('./controllers/files.controller');
const Memes = require('./controllers/memes.controller');
const Comments = require('./controllers/comments.controller');
require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);

	app.get('/files', Files.getFileList);
	app.get('/files/content', Files.getContentFiles);
	app.get('/files/uploads', Files.getUploadFiles);
	app.post('/files/upload', Files.uploadFile);
	app.delete('/files/:id', Files.deleteFile);
		
	app.get('/memes', Memes.getMemes);
	app.post('/memes', Memes.addMeme);
	app.delete('/memes/:id', Memes.deleteMeme);
		
		
		//Files.uploadFile);
	app.post('/files', Files.addFile);

	app.get('/comments', Comments.getAllComments);
	app.post('/comments', Comments.addComment);

	app.get('/', (req, res, next) => {
		res.send(['water', 'phone', 'paper']);
	});
};

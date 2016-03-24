'use strict';

var path = process.cwd();
var UrlHandler = require(path + '/app/controllers/urlHandler.server.js');

module.exports = function (app, db) {
	
	var urlHandler = new UrlHandler(db);
	
	app.route('/')
		.get(function(req,res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/new/http://:site')
		.get(urlHandler.getShortUrl);
		
	app.route('/new/https://:site')
		.get(urlHandler.getShortUrl);
	
 	app.route('/new/:site')
 		.get(urlHandler.badUrl);

 	app.route('/:id')
 		.get(urlHandler.getRedirectUrl);
};


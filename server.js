'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongo = require('mongodb').MongoClient;
var app = express();

mongo.connect(process.env.MONGO_URI,function(err,db) {
    if(err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected.');
    }
    
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    app.use('/public', express.static(process.cwd() + '/public'));
//     app.use('/common', express.static(process.cwd() + '/app/common'));

    routes(app, db);

    var port = process.env.PORT || 8080;
    app.listen(port,  function () {
	    console.log('Node.js listening on port ' + port + '...');
    });

});
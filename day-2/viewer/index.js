var express = require('express');
var app = express();

var request = require('request');

var mongoose = require('mongoose');

var User = require('./schema.js');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views/static'));

mongoose.connect('mongodb://shiya:autodesk@ds015710.mlab.com:15710/taipei-workshop');

var getAuthToken = function (clientId, clientSecret, callback) {

	var options = {
		method: 'POST',
		url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}, 
		form: {
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: 'client_credentials'
		}
	};
	
	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	console.log(body);
	  	callback(body);
	  	return;
	  }
	});
}

var saveAdskCredToDatabase = function (clientId, clientSecret, tokenBody) {
	User.findOne(
	{'autodesk.clientId':  clientId}, 
	function(err, user) {
		if (err) console.log(err);
		if (user) {
			user.autodesk.token = tokenBody;
			user.save(function (err) {
				console.log(tokenBody + ' saved to database!');
				return;
			});
		} else {
			console.log('cant find user');
			var newUser = new User;
			newUser.autodesk.clientId = clientId;
			newUser.autodesk.token = tokenBody;
			newUser.save(function (err) {
				if (err) console.log(err);
				return;
			});
		}
	});
}

app.get('/', function (req, res) {
	var clientId = 'k9bmPGWbihNWfwm2b83YvXnJnbK22mbp';
	var clientSecret = 'SArl6yRFVzdPtRH1';

	getAuthToken(clientId, clientSecret, function (body) {
		res.render('index', {
			message: body
		});
		saveAdskCredToDatabase(clientId, clientSecret, body);
	});
});

app.listen(3000);
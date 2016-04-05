var request = require('request');
var autodeskCredentials = require('../config/autodesk.js')

module.exports = function (app) {
  app.get('/', function (req, res) {
  	autodeskAuth ('k9bmPGWbihNWfwm2b83YvXnJnbK22mbp', 'SArl6yRFVzdPtRH1', function (body) {
  		res.render('index', {
  			message : body
  		});
  	});
  });
}

var autodeskAuth = function (clientId, clientSecret, callback) {
  var options = {
    method: 'POST',
    url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      'client_id': autodeskCredentials.clientId,
      'client_secret': autodeskCredentials.clientSecret,
      'grant_type': 'client_credentials'
    }
  };
  var httpResponse = function (err, res, body) {
    console.log(body);
    callback(body);
  };
  request(options, httpResponse);
};

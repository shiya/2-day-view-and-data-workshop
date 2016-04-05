var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

var message = 'Hello world!';

app.get('/', function (req, res) {
	res.render('index', {
		message : message
	});
});

console.log('App is listening at PORT ' + port);
app.listen(port);
var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

require('./app/controllers.js')(app);

console.log('App is listening at PORT ' + port);
app.listen(port);

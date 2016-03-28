# Introduction to View and Data API
## Installation
- Register as a third-party Developer with [Autodesk](https://developer.autodesk.com/)
- Install [Node.js](https://nodejs.org/)
- Create a MongoDB database at [mLab](https://mlab.com/)

## A walkthrough of View and Data API
[Slides](http://www.shiyaluo.com/slidedecks/webcast-2016-2-29/)

## Server-side technologies
- Node.js
 - The technology we'll use for today's workshop. It's incredibly easy to set up, deploy and run. Node.js is very suitable for apps without a great deal of logic, backward compatibility to very old systems or heavy computing, and is great for developing apps based on JSON or REST APIs since JavaScript is JSON-native(chicken and egg).

## REpresentation State Transfer (REST) APIs
- REST APIs are a protocol that specifies how to send and receive HTTP requests and responses
- Most Web services exist in the form of REST APIs
- Exists in 4 main types, there are more, but these cover most scenarios
  - GET: Read
  - POST: Create
  - PUT: Create with path or update existing resource
  - DELETE: Delete

## MEAN vs. \*AMP
- MEAN
 - MongoDB
 - Express.js
 - Angular.js
 - Node.js

- \*AMP
  - Linux(LAMP)/Windows(WAMP) server
  - Apache HTTP Server
  - MySQL Relationsal Database
  - PHP/Perl/Python

## Create a quick server with Node

```
// server.js
var http = require('http'); //native node module

function hello(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
}

var server = http.createServer(hello);

server.listen(3000);
```

## MVC with Node
The Model View Controller (MVC) pattern is commonly used in many server-side technologies. It separates database schema (model), interface (view), and routing logic (controller) from each other, letting engineers working on different aspects of the app.

## npm
Node Package Manager is a tool that let you download packages to work with Node.js.

Common commands:
-  `npm init`
  - Creates a package.json file that includes all configuration information with your Node app.
-  `npm install`
  - installs the dependencies in your app.
  - `-g`: global install
  - `--save`: save the package so it appears in your package.json
  - `--save-dev`: save the package as a dev dependency

## Express.js
Express is a Node.js server framework that makes server routing and handling request and responses easy.

Hello World with express
```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);
```

## Templating with `ejs`
[Embedded JavaScript Template](https://www.npmjs.com/package/ejs)(ejs) is a templating engine that renders pages and makes it easy to pass server-side data to the views. By default, it reads the `.ejs` files from the `/views` folder.

Features:
- Control flow with <% %>
- Escaped output with <%= %>
- Unescaped raw output with <%- %>
- Newline-trim mode ('newline slurping') with -%> ending tag
- Whitespace-trim mode (slurp all whitespace) for control flow with `<%_ _%>`
- Custom delimiters (e.g., use '' instead of '<% %>')
- Includes
- Client-side support
- Static caching of intermediate JavaScript
- Static caching of templates
- Complies with the Express view system

Hello World with ejs
```
// index.js
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
```

```
<!-- views/index.ejs -->
<h1>My page with express and ejs</h1>
<%= message %>
```

## `request` module
Request is a module that makes it very easy to make http calls. I've done without, but it's much easier with.


Making a POST request to Autodesk authentication server with request:
```
var autodeskAuth = function (clientId, clientSecret, callback) {
	var options = {
		method: 'POST',
		url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		form: {
			'client_id': 'YOUR CLIENT ID',
			'client_secret': 'YOUR CLIENT SECRET',
			'grant_type': 'client_credentials'
		}
	};
	var httpResponse = function (err, res, body) {
		console.log(body);
		callback(body);
	};
	request(options, httpResponse);
};
```


## Database with MongoDB
You should save some of the data after you call the APIs in a database. MongoDB is a popular NoSQL database. It's very easy to use, very easy to set up.
It stores data in JSON format that looks something like:
```
{
  "_id": {
    "$oid": "56dbfcc960edbef91be976da"
  },
  "userId": {
    "shiya"
  }
}
```

It's easiest to use the mongoose module to define schema for MongoDB.

To configure MongoDB in Node with mongoose, do this:
```
var mongoose = require('mongoose');
mongoose.connect({
  'url' : 'mongodb://<dbuser>:<dbpassword>@ds123456.mlab.com:19268/autodeskacmsample'  
});
```

The schema file should look something like:
```
//schema.js (or name this js file similar to your database name, like autodesk.js)
var mongoose = require('mongoose');
var schema = mongoose.Schema({
  token: string;
});
module.exports = mongoose.model('autodesk', schema);
```

You can set up your own local environment, or just use an online service. I used [mLab](https://mlab.com/), it has a free version for testing.

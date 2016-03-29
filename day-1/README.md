# View and Data API 入门
## 安装
- 在 [Autodesk 官网](https://developer.autodesk.com/)注册成为第三方开发者
- 安装 [Node.js](https://nodejs.org/)
- [mLab](https://mlab.com/) 创建一个MongoDB数据库

## View and Data API 简介
[Slides](http://www.shiyaluo.com/slidedecks/webcast-2016-2-29/)

## 后端技术
- Node.js
 - 这篇教程用 Node.js 作为后端。Node 是一款非常轻量化的后端技术，十分适合用于做REST请求，在业务逻辑不繁杂的应用场景非常不错。

## REpresentation State Transfer (REST) API
- REST 是定义如何发送和接受 HTTP 请求的规范
- 大部分 Web 服务都以 REST API 的形式开放出来
- 以下四种是最常见的：
  - GET: 读取
  - POST: 创建
  - PUT: 指定路径创建
  - DELETE: 删除

## MEAN vs. \*AMP
- MEAN
 - MongoDB
 - Express.js
 - Angular.js
 - Node.js

- \*AMP
  - Linux(LAMP)/Windows(WAMP) server
  - Apache HTTP Server
  - MySQL
  - PHP/Perl/Python

## 用 Node 快速搭一款服务器

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
MVC 是一款在后端技术里非常常见的框架，把数据库逻辑（Model）、界面（Interface）和业务逻辑（controller）分开出来。

## npm
Node Package Manager 是一款用于下载 Node.js 包的工具。

常见命令：
-  `npm init`
  - 创建 `package.json`，里面定义 app 里的各种信息，如依赖、作者、git 路径等等。
-  `npm install`
  - 安装依赖
  - `-g`: 全局安装
  - `--save`: 把依赖的包信息存进 package.json
  - `--save-dev`: 存进开发依赖里

## Express.js
Express 是 Node.js 一款常用框架，方便接受和发送请求以及处理各种业务逻辑。

Hello World with express
```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);
```

## `ejs`模板引擎
[Embedded JavaScript Template](https://www.npmjs.com/package/ejs)(ejs) 是一款方便把后端数据传到前端的模板工具。在默认情况下，它从根目录下的`/views`读取文件。

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
Request是一个方便发送 HTTP（REST API） 请求的模块。

用 request 给 Autodesk authentication 服务器发送请求获取 token：
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


## MongoDB 数据库
有些 API 请求所返回的数据应该被存入数据库。在这篇教程里用 MongoDB，它是一个 NoSQL 数据库。
NoSQL 数据库是用 JSON 形式存入的：
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

用 mongoose 模块定义 MongoDB schema 最方便：

```
var mongoose = require('mongoose');
mongoose.connect({
  'url' : 'mongodb://<dbuser>:<dbpassword>@ds123456.mlab.com:19268/autodeskacmsample'  
});
```

schema 文件：
```
//schema.js (or name this js file similar to your database name, like autodesk.js)
var mongoose = require('mongoose');
var schema = mongoose.Schema({
  token: string;
});
module.exports = mongoose.model('autodesk', schema);
```

用本地的 MongoDB 或者线上服务都可以，我用了 [mLab](https://mlab.com/)，测试版是免费的。

##课后：
- 写一个从 Autodesk 数据库获取 token 的 app
  - 把 token 存入数据库
  - 每次请求 REST API 时从数据库获取 token
  - 如果过期，重新获取 token
  - 拿到 token 后用 ejs 传到前端

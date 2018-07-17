'use strict'

let student = require("./lib/myfirstmodule.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/', function(req, res){
	res.type('text/html');
	res.sendFile(__dirname + '/public/home.html');
});

app.get('/about', function(req, res){
	res.type('application/json');
	res.sendFile(__dirname + '/package.json');
});

app.get('/delete', function(req,res){
	let result = student.delete(req.query.name);
	res.render('delete', {name: req.query.name, result: result});
});

app.post('/get', function(req,res){
	console.log('You have requested..');
	console.log(req.body);
	var found = student.get(req.body.name);
	
	res.render("details", {name: req.body.name, result: found});
});

app.use(function(req,res) {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Page Not Found');
});

app.listen(app.get('port'), function() {
	console.log('Express started');
});
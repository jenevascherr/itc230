'use strict'

var studentMethods = require("./lib/studentMethods");
var Student = require("./models/students"); //database model


let student = require("./lib/myfirstmodule.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/', function(req, res, next) {
  studentMethods.getAll().then((items) => {
    res.render('home', {student: items }); 
  }).catch((err) =>{
    return next(err);
  });
});

app.get('/about', function(req, res){
	res.type('application/json');
	res.sendFile(__dirname + '/package.json');
});

app.get('/delete', function(req, res, next){
  Student.remove({ name:req.query.name}, function (err, result){
   console.log(err) 
    console.log(result)
    if (err) return next(err);
    let deleted = result.n !==0;
    Student.count((err, total) => {
      res.type('text/html');
      res.render('delete', {name: req.query.data, deleted , total: total});
	});
  });
});

app.get('/details', function(req,res,next){
  Student.findOne({name:req.query.name}, function (err, item) {
    if (err) return next(err);
    res.type('text/html');
    res.render('details', {result: item});
  });
});

//send POST
app.post('/detail', function(req,res,next){
  Student.findOne({name:req.body.name}, function (err, item) {
    if (err) return next(err);
    res.type('text/html');
    res.render('details', {result: item});
  });
});

app.use(function(req,res) {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Page Not Found');
});

app.listen(app.get('port'), function() {
	console.log('Express started');
});


'use strict'

var studentMethods = require("./lib/studentMethods");
var Student = require("./models/students"); //database model


let student = require("./lib/myfirstmodule.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

var handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/', function(req, res, next) {
	Student.find({}, function (eer, items) {
	res.render('home.html', {items: items});
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

app.get('/detail', function(req,res,next){
  Student.findOne({name:req.query.name}, function (err, item) {
    if (err) return next(err);
    res.type('text/html');
    res.render('details', {result: item});
  });
});

/*app.get('/add', function(req,res,next){
	Student.add({name:req.query.name}),
*/

//send POST
app.post('/detail', function(req,res,next){
  Student.findOne({name:req.body.name}, function (err, item) {
    if (err) return next(err);
    res.type('text/html');
    res.render('details', {result: item});
  });
});

//api
app.get('/api/student/:name', (req, res) => {
	let name = req.params.name;
	console.log(name);
	Student.findOne({name: name}, (err, result) => {
		if (err || !result) return (err);
		res.json( result );
	});
});

app.get('/api/students', (req, res) => {
	Student.find((err,results) => {
		if (err || !results) return (err);
		res.json(results);
	});
});

app.get('/api/delete/:name', (req, res) => {
	Student.remove({"name":req.params.name}, (err, result) => {
		if (err) return (err);
		res.json({"deleted": result.n});
	});
});

app.get('/api/add/:name/:family/:grade/:course/:year', (req, res) => {
	let name = req.params.name;
	Student.update({ name: name}, 
				   {name: name, family: req.params.family, grade: req.params.grade, course: req.params.course, year: req.params.year }, 
				   {upsert: true }, (err, result) => {
		if (err) return(err);
		res.json({updated: result.nModified});
	});
});

app.post('/api/add/', (req, res, next) => {
	if (!req.body._id) {
		let Student = new Student({name:req.body.name, family: req.body.family, grade: req.body.grade, course: req.body.course, year: req.body.year });
		Student.save((err, newStudent) => {
			if (err) return next(err);
			console.log(newStudent);
			res.json({updated: 0, _id: newStudent._id})
		})
                                  
	}else{
		Student.AddOne({_id: req.body._id}, {name:req.body.name, family: req.body.family, grade: req.body.grade, course: req.body.course, year: req.body.year },
        {upsert: true }, (err, result) => {
		if (err) return next(err);
		res.json({updated: result.nModified, _id: req.body._id});

    });
    };
});


app.use(function(req,res) {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Page Not Found');
});

app.listen(app.get('port'), function() {
	console.log('Express started');
});


'use strict'

let Student = require("./models/students"); //database model
let bodyParser = require("body-parser");
let express = require("express");

let app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', require("cors")());
app.use((err, req, res, next) => {
	console.log(err);
});

let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/', (req, res, next) => {
	Student.find((eer, items) => {
		console.log(items)
	//if (err) return next(err);
	res.render('home.html', {items: JSON.stringify(items)});
  });
});

app.get('/about', (req, res) => {
	res.type('text/html');
	res.render('about.html');
});


//api
app.get('/api/student/:name', (req, res, next) => {
	let name = req.params.name;
	console.log(name);
	Student.findOne({name: name}, (err, result) => {
		if (err || !result) return next(err);
		res.json( result );
	});
});

app.get('/api/students', (req, res, next) => {
	Student.find((err,results) => {
		if (err || !results) return next(err);
 		res.json(results);
	});
});

app.get('/api/delete/:id', (req, res, next) => {
	Student.remove({"_id":req.params.id}, (err, result) => {
		if (err) return next(err);
		res.json({"deleted": result.result.n});
	});
});

app.get('/api/add/:name/:family/:grade/:course/:year', (req, res) => {
	let name = req.params.name;
	Student.update({ name: name}, 
				   {name: name, family: req.params.family, grade: req.params.grade, course: req.params.course, year: req.params.year }, 
				   {upsert: true }, (err, result) => {
		if (err) return next(err);
		res.json({updated: result.nModified});
	});
});

app.post('/api/add', (req, res, next) => {
	if (!req.body._id) {
		let Student = new Student({name:req.body.name, family: req.body.family, grade: req.body.grade, course: req.body.course, year: req.body.year });
		Student.save((err, newStudent) => {
			if (err) return next(err);
			console.log(newStudent);
			res.json({updated: 0, _id: newStudent._id})
		})
                                  
	}else{
		Student.AddOne({_id: req.body._id}, {name:req.body.name, family: req.body.family, grade: req.body.grade, course: req.body.course, year: req.body.year },
        (err, result) => {
		if (err) return next(err);
		res.json({updated: result.nModified, _id: req.body._id});

    });
    }
});


app.use((req,res) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Page Not Found');
});

app.listen(app.get('port'), () => {
	console.log('Express started');
});


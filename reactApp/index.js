// index.js for ITC230
// up thru and including week 6 assignment

'use strict'

const express = require("express");
const Student = require("./models/students");
const bodyParser = require("body-parser");
const app = express();

// set port to 3000 with Express
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.log(err)
});

// set up handlebars template engine
let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: ".html"}));
app.set("view engine", ".html");

// static file for home.html
app.get('/', (req, res, next) => {
    Student.find((err, students) => {
        console.log(students);
        if (err) return next(err);
        res.render('home', {students: JSON.stringify(students)});
    });
});

// plain text response for about page
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.render("Here's the about page.");
});

// GET response for get path
app.get('/get', (req, res) => {
    Student.findOne({ name: req.query.name }, (err, students) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {found: students} );
    });
});

// POST response for get path
app.post('/get', (req, res) => {
    Student.findOne({ name: req.body.name }, (err, students) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {found: students} );
    });
});

// GET response for delete path
app.get('/delete', (req, res) => {
    Student.remove({ name: req.query.name}, (err, result) => {
        if (err) return next(err);
        let deleted = result.result.n !== 0;
        Student.count((err, total) => {
            res.type('text/html');
            res.render('delete', {
                name: req.query.name,
                //deleted: result.result,
                deleted: result.result.n !==0,
                total: total });
        });
    });
});


// APIs
// get all items
app.get('/api/students', (req, res, next) => {
    let name = req.params.name;
    console.log(name);
    Student.find((err, results) => {
        if (err || !results) return next(err);
        res.json(results);
    })
});

// get a single item
app.get('/api/student/:name', (req, res, next) => {
    let name = req.params.name;
    Student.findOne({name: name}, (err, found) => {
        if (err || !found) return next(err);
        res.json(found);
    });
});

// delete an item
app.get('/api/delete/:name', (req, res, next) => {
    Student.remove({"name":req.params.name}, (err, found) => {
        if (err) return next(err);
        res.json({"deleted": found.result});
    });
});

// add or update an item
app.get('/api/add/:name/:family/:grade/:course/:year', (req, res, next) => {
    let name = req.params.name;
    Student.update({name: name}, {name:name, family: req.params.family, grade: req.params.grade, course: req.params.course, year: req.params.year}, {upsert: true}, (err, result) => {
        if (err) return next(err);
        res.json({updated: result.n});
    });
});


// USE response for 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Page Not Found');
});

// start server
app.listen(app.get('port'), () => {
    console.log('Express started');
});
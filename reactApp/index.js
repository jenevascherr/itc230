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
app.use('/api', require("cors")());
app.use((err, req, res, next) => {
  console.log(err)
});

// set up handlebars template engine
const handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: ".html"}));
app.set("view engine", ".html");

// static file for home.html
app.get('/', (req, res, next) => {
    Student.find((err, items) => {
        console.log(items);
        if (err) return next(err);
        res.render('home', {items: JSON.stringify(items)});
    });
});

// plain text response for about page
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.render("Here's the about page.");
});

// GET response for get path
app.get('/get', (req, res) => {
    Student.findOne({ name: req.query.name }, (err, items) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {found: items} );
    });
});

// POST response for get path
app.post('/get', (req, res) => {
    Student.findOne({ name: req.body.name }, (err, items) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {found: items} );
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
app.get('/api/items', (req, res, next) => {
    let name = req.params.name;
    console.log(name);
    Student.find((err, items) => {
        if (err) return next(err);
        res.json(items);
    })
});

// get a single item
app.get('/api/items/:name', (req, res, next) => {
    let name = req.params.name;
    Student.findOne({name: req.params.name}, (err, item) => {
        if (err) return next(err);
        if (item) {
        res.json({name:item.name, family:item.family, grade:item.grade, course:item.course, year:item.year});
        }else{
        	res.json({"err": "Student not enrolled", "query":req.params.name});
        }
    });
});

// delete an item
app.get('/api/delete/:name', (req, res, next) => {
    Student.remove({name: req.params.name}, (err, item) => {
        if (err) return next(err);
        // return number of items deleted, or error if 0
        if (item.n != 0) {
        res.json({deleted: item.n});
        } else {
            res.json({"err": "No such student to delete"});
        }
    });
});




app.get('/api/delete/:id', (req, res, next) => {
    Student.remove({"_id":req.params.id}, (err, result) => {
        if (err) return next(err);
        res.json({"deleted": result.result.n});
    });
});

// add an item
app.post('/api/add/', (req, res, next) => {
    if (!req.body._id) {
        let item = new Student({
                                _id: req.body._id,
                                name:req.body.name,
                                family:req.body.family,
                                grade:req.body.grade,
                                course:req.body.course,
                                year:req.body.year
                                });
        item.save((err, newStudent) => {
            if (err) return next(err);
            console.log(newStudent);
            res.json({updated: 0, _id: newStudent._id});
        });
    } else { 
        Student.updateOne({ _id: req.body._id}, {
                                                name:req.body.name,
                               				    family:req.body.family,
                                				grade:req.body.grade,
                                				course:req.body.course,
                                				year:req.body.year 
                                                }, 
            (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});


// add or update an item
app.get('/api/add/:name/:family/:grade/:course/:year', (req, res, next) => {
    let name = req.params.name;
    Student.update({name: name}, 
                   {name:name, family: req.params.family, grade: req.params.grade, course: req.params.course, year: req.params.year}, {upsert: true}, (err, result) => {
        if (err) return next(err);
        res.json({updated: result.n});
    });
});

/*
// USE response for 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Page Not Found');
});
*/

// start server
app.listen(app.get('port'), () => {
    console.log('Express started');
});
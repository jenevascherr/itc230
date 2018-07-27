"use strict"

var Student = require("../models/students");


/*
// return all records
Student.find({}, (err, items) => {
  if (err) return next(err);
  console.log(items.length);
  // other code here
});


// return all records that match a condition
Student.find({'grade':'B'}, (err, items) => {
 if (err) return next(err);
 console.log(items.length);
 // other code here
});


// return a single record
Student.findOne({'first_name':'Richie'}, (err, item) => {
  if (err) return next(err);
  console.log(item);
  // other code here
}); 


// insert or update a single record
var newStudent = {'first_name':'Dune', 'last_name':'Fransherbert', 'grade': 'D', 'course': 'Writing', 'year': 1971 }
Student.update({'first_name':'Dune'}, newStudent, {upsert:true}, (err, result) => {
  if (err) return next(err);
  console.log(result);
  // other code here
});
*/

exports.getAll = () => {
/*
  return Student.find({}, (err, result) => {
    if (err) {
      return err;
    } 
    return result;
  });
  */
  return Student
};

exports.getOne = function(name) {
  return Student.find(function(item) {
      return item.name == name;
  });
};

exports.deleteOne = function(name) {
  const oldLength = Student.length;
  Student = Student.filter(function(item){
      return item.name !==name;
  });
  return {deleted: oldLength !==Student.length, 
          total: Student.length 
  };
};

exports.addOne = function(newStudent) {
  var added = false
  if (!this.getOne(newStudent.name)) {
      Student.push(newStudent);
      added = true;
  }
  return { added: added, 
           total: Student.length 
  };
};

// return all records
Student.find({}, function (err, items) {
//console.log(items);
});

Student.find({}, function (err, items) {
  if (err) {console.log(err) }
  else {
// console.log(items.length);
  }
});
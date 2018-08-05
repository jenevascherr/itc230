'use strict'

let students = [
	{
		name: 'Chelsea',
		course: 'Math',
		grade: 'B'
	},
	{
		name: 'Mark',
		course: 'History',
		grade: 'B'
	},
	{
		name: 'Richie',
		course: 'Physics',
		grade: 'C+'
	},
	{
		name: 'Drew',
		course: 'Biology',
		grade: 'A'
	},
	{
		name: 'Debbie',
		course: 'Math',
		grade: 'F'
	},
];

exports.getAll = function () {
	//print all objects in the array.
	const LABEL_NAME = ' name: ';
	const LABEL_COURSE = ' course: ';
	const LABEL_GRADE = ' grade:';
	
	let msg = "";
	
	for(var i=0; i<students.length; i++) {
		msg += LABEL_NAME + students[i].name + LABEL_COURSE + students[i].course + LABEL_GRADE + students[i].grade + " ** ";
	}
	
	return(msg);
}

// http://127.0.0.1:3000/get/Drew  or get/Richie
// how to get the index (like Drew or Richie)

// or, it may look like:
// http://127.0.0.1:3000/get?Drew or get?Richie
// how to get the index (like Drew or Richie)

// get the actual object with the index
// var index = 'Richie';
// var student = students.name[index];

// var index = 'Jeneva';
// var student = students.name[index];
// what is student?  undefined  (test for this. maybe return a nicer message than undefined)

/**
 create a function that will loop though the array to find if query matches by name, if so: break, if not
 redo on next object. If not matches query, result is undefined. 
  use a conditional (ternary) operator to return the result or "not found" statements based on conditions.

exports.get = (name) => {
	var result = students.find(student => student.name === name);
	return (result) ? result.name + ", " + result.course + ", " + result.grade : "Cannot find " + name;

};
**/ exports.get = (name) => {
	// information about one selected object from an array search.
	return students.find((item) => {
		return item.name === name;
	})
}; 
/** how to delete an object from an array?
// watch out for undefined (e.g. try to delete object 'Jeneva'. There is no Jeneva)

Similar to the get function, we create a function that will loop through the array looking for a value
"name" which matches the posed query. If the object being observed matches the query, the loop proposes breaks 
and the object is removed. If the object being observed does not match, the loop returns a value of -1 as a 
result of the findIndex() function, then repeats its inspection on the next object.
 If none of the objects in the array match the query's requirements, the result is undefined. 
 As long as the result is -1 the loop continues until the end the array.
**/
exports.delete = (name) => {
	var result = students.findIndex(student => student.name === name);
	console.log(result);
	if (result !== -1) {
		var removed = students.splice(result,1);
		console.log(removed[0]);
		return "You have removed" + removed[0];
	} else {
		return "Cannot find " + name;
	}
}
	exports.add = (newStudent) => {
    var found = this.get(newStudent.name);
    var newItem = [];
    newItem = [];   
    newItem ["name"] = newStudent;
    if (!found) {
        students.push(newItem);
    }
    var action = (found) ? newStudent + " updated" : newStudent + " added";
    return {"action": action, "total": students.length };
    }

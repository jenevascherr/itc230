
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
**/
exports.get = (name) => {
	var result = students.find(student => student.name === name);
	return (result) ? result.name + ", " + result.course + ", " + result.grade : "Cannot find " + name;
}

// how to delete an object from an array?
// watch out for undefined (e.g. try to delete object 'Jeneva'. There is no Jeneva)
exports.delete = (name) => {
	students.some((item, index) => {
		if(students[index][name.key] === name.value){
			students.splice(index, 1);
			return true;
			}
			return false;
			});
			return students;
		}
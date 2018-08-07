//datamodel script
var mongoose = require("mongoose");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
var connectionString = "mongodb://admin:Jg2fd1stxs@ds141621.mlab.com:41621/students_worst_grade";
mongoose.connect(connectionString,{ useNewUrlParser: true });

// local db connection settings 
// var ip = process.env.ip || '127.0.0.1';
// mongoose.connect('mongodb://' +ip+ '/students_worst_grade');
var options = { server: 
  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } 
   } 
};

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
// values indicate the data type of each key
var mySchema = mongoose.Schema({
 name: { type: String, required: true },
 family: String,
 grade: String,
 course: String,
 year: Number
}); 

module.exports = mongoose.model('Student', mySchema);

//Custom Method




//
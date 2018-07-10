var http = require('http'); 
var fs = require('fs');
const qs = require('querystring');
var url = require('url');
var dt = require('./myfirstmodule');

function serveStaticFile(res, path, contentType, responseCode) {
	if(!responseCode) responseCode = 200;
	fs.readFile(_dirname + path, function(err,data) {
	if(err) {
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.end('500 - Internal Error');
	} else {
		res.writeHead(responseCode, { 'Content-Type' : contentType });
		res.end(data);
		}
	});
}

http.createServer(function(req ,res) {
  var params = url.parse(req.url, true);
  var path = params.pathname;
  
  var cmd = findCommand(path);
  switch(cmd) {
    case '/':
      fs.readFile('home.html', function (err, data) {
      if (err) return console.error(err);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data.toString());
      //console.log(data.toString());
      });
      break;
          
    case '/about':
      fs.readFile('package.json', function (err, data) {
      if (err) return console.error(err);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(data.toString());
      //console.log(data.toString());
      });
      break;
    
       case '/getall':
      fs.readFile('home.html', function (err, data) {
      if (err) return console.error(err);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(dt.getAll());
      res.end();
      //console.log(data.toString());
      });
      break;
    
    case '/get':
      	res.writeHead(200, { 'Content-Type' : 'text/plain' });
      	var look = params.query;
      	var write = dt.get(look.name);
      	if (write) {
      		string = JSON.stringify(write);
      		res.end(string);
      		} else {
      			res.end('This query is not in the array');
      		}
      break;
      
    case '/delete':
      res.writeHead(200, { 'Content-Type' : 'text/plain' });
      var look = params.query;
      var write = dt.delete(look.name);
      if (write) {
      		string = JSON.stringify(write);
      		res.end(string);
      		} else {
      			res.end('This query is not in the array');
      		}
      break;
      
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('CODE 404: The URL entered does not exist');
      break;
    }
}).listen(process.env.PORT || 3000);

/**
	find the command portion of the path.
	The /, /about and /getall don't have any other component
	The /get and /delete commands will have a key
	If none of the above, return 'unknown'
**/
var findCommand = function(path) {
	switch(path) {
		case '/':
		case '/about':
		case '/getall': {
			return path;
		}
	}
	
	if(path.startsWith('/get')) {
		return '/get';
	}
	
	if(path.startsWith('/delete')) {
		return '/delete';
	}
	
	return 'unknown';
}

var add = function (x, y, callback) {
    console.log(x + y);
    
    if(callback) {
        callback();
    }
};

var done = function () {
    console.log("done");
};

var finished = function () {
    console.log("finished");
};

add(4, 3, done);
add(3, 1, finished);
add(6, 8);
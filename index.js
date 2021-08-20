const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
    res.writeHead(200 , { 'Content-Type' : 'text/html' });
    fs.readFile('./public/index.html' , null ,function (err ,data){
        if (err) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
    // res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
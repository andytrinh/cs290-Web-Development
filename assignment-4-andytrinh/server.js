/*
 * Write your server code in this file.
 */

var url = require("url");
var http = require("http");
var fs = require("fs");
var path = require("path");

var port = process.env.PORT || 3000;

http.createServer(function (req, res) {
  if(req.url == "/"){
    fs.readFile(__dirname + "/public//index.html", function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }

  else if(req.url.indexOf("benny.jpg") != -1){
    fs.readFile(__dirname + "/public//benny.jpg", function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {"Content-Type": "image/jpg"});
      res.write(data);
      res.end();
    });
  }

   else if(req.url.indexOf("index.js") != -1){
     fs.readFile(__dirname + "/public//index.js", function (err, data) {
       if (err) console.log(err);
       res.writeHead(200, {"Content-Type": "text/javascript"});
       res.write(data);
       res.end();
     });
   }

  else if(req.url.indexOf("style.css") != -1){
     fs.readFile(__dirname + "/public//style.css", function (err, data) {
       if (err) console.log(err);
       res.writeHead(200, {"Content-Type": "text/css"});
       res.write(data);
       res.end();
     });
   }

   else if(req.url.indexOf("index.html") != -1){
     fs.readFile(__dirname + "/public//index.html", function (err, data) {
       if (err) console.log(err);
       res.writeHead(200, {"Content-Type": "text/html"});
       res.write(data);
       res.end();
     });
   }
   
   else {
     fs.readFile(__dirname + "/public//404.html", function (err, data) {
       if (err) console.log(err);
       res.writeHead(200, {"Content-Type": "text/html"});
       res.write(data);
       res.end();
     });
    }
    }).listen(3000);

console.log("Listening 3000");

var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var NodeAPI = require("easynodeapi")

http.createServer(function (req, res) {
    var API = NodeAPI(req,res);
    API.OnUrl("GET","/",function(){
        API.View("./index.html");
    })
    API.Default(function(){
        API.File("." + req.url);
    })
    API.Server();
}).listen(3000);
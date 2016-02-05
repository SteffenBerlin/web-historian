var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers.js');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};
 
exports.serveIndex = function(res, asset) {
  archive.readIndex(function(data){
    res.writeHead(200, this.headers);
    res.end(JSON.stringify(data));
  });

};

exports.serveAssets = function(res, url) {
    // console.log("1. Url for ServeAssets", url);
    archive.isUrlInList(url, function(inList){
      // console.log("4. callback result - is it in the list?",inList);
      if (inList) {
        archive.isUrlArchived(url, function(err, data){
          if (data) {
            res.writeHead(200, this.headers);
            res.end(JSON.stringify(data));
          } else { 
            //return is in progress
          }
        });
      } else {
        res.writeHead(404, this.headers);
        res.end("There was an error 404");
      }
    });
};

exports.postAssets = function(res, url) {
  archive.isUrlInList(url, function(inList){
    if(!inList){
      archive.addUrlToList(url, function(){
        res.writeHead(201, this.headers);
        res.end("Added to the list");
      });
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!

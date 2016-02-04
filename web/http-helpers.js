var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveIndex = function(res, asset, callback) {
  // fs.readFile(indexPath, 'utf8', function(err, data){
  //   if(err) throw err;
  //   var indexPage = JSON.stringify(data);
  // });
  res.writeHead(200, null);
  res.end(JSON.stringify('Hello test /<input/ what'));
};

exports.serveAssets = function(res, url, callback) {
  if (archive.isUrlInList(url)){
        res.writeHead(200, null);
        // figure out how to read the site in archives/sites/ folder
        // and pass it back to res.end
        res.end(JSON.stringify());
      }else{
        res.writeHead(404, null);
      }
};



// As you progress, keep thinking about what helper functions you can put here!

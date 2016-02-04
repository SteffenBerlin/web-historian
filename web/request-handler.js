var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');



exports.handleRequest = function (req, res) {
  console.log("Client is requesting " + req.method + " for url " + req.url);
  
  var url = req.url.slice(1);

  // if requesting index page
  var indexPath = path.join(__dirname, '/public/index.html');
  if(req.method === 'GET' && url.length === 0){
    httpHelp.serveIndex(res, indexPath);
  } else if(req.method === 'GET') {
    httpHelp.serveAsset(res, url);
  }
  // res.end(archive.paths.list);
};


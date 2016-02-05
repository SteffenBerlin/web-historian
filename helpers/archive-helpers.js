var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require("http");
var request = require("request");


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html')
};

exports.readIndex = function (callback) {
  fs.readFile(exports.paths.index, "utf8", function(err, data){
    if(err) throw err;
    callback(data);
  });
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  console.log("setInterval is reading");
  // console.log("2. URL passed to isUrlInList:", url);
  fs.readFile(exports.paths.list,'utf8', function(err, data){
    // console.log("3. Inside fs.readFile - Data returned: ", data);
    var urlArray = data.split('\n');
    console.log(urlArray);
    callback(urlArray, err);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data, err){
    if(err) throw err;
    if(data.indexOf(url) > -1 ){
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, '\n'+url, 'utf8', function(err, data){
    if(err) throw err;
    callback();
  });
};

exports.isUrlArchived = function(url, callback, isLast) {
  console.log("setInterval is checking the url:", url);
  fs.readFile(exports.paths.archivedSites + '/' + url + '.html', 'utf8', function(err, data){
    if(err) {
      callback(err, null, url, isLast);
    } else {
      callback(null, data, url);
    }

  });
};

var getBody = function(urlToDownload) {
    var uri = { uri: 'http://' + urlToDownload };
    request(uri, function(error, response, body) {
        // console.log("HTML BODY:", body);
      console.log("inside Downloadurls and creating the files");
      fs.writeFile(exports.paths.archivedSites + "/" + urlToDownload + '.html', body, 'utf8', function(){ });
  });
};

exports.downloadUrls = function(urlsForDownload) {
  // loop through the urlsForDownload
  console.log('THIS IS THE DOWNLOADER LOADING THE FOLLOWING URLS:', urlsForDownload);
  for(var i = 0; i < urlsForDownload.length; i++) {
    var urlToDownload = urlsForDownload[i];
    console.log("GOING THROUGH THE URLS TO DOWNLOAD THEM", urlToDownload);
    getBody(urlToDownload);
  }
};


var archive = require('../helpers/archive-helpers.js');
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
exports.htmlFetcher = function() {
  // storage array
  console.log("inside html fetcher");
  var urlsToDownload = [];
  // call list of URLs from readListOfUrls
  archive.readListOfUrls(function(arrays, err){
    if(err) throw err;
    //in the callback:
    // for each url 
    for(var i = 0; i < arrays.length; i++){
      //call isUrlArchived for each URL
      var url = arrays[i];
      archive.isUrlArchived(url, function(err, data) {
      //pass in callback(err, data)
        //if(err)
        if(err) {
          // push url to storage array
          urlsToDownload.push(url);
        }
      });
    }
    // call downloadUrls with storage array
    archive.downloadUrls(urlsToDownload);
  });
  setTimeout(exports.htmlFetcher, 1000);
};

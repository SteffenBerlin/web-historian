var archive = require('../helpers/archive-helpers.js');
// Use the code in `archive-helpers.js` to actually download the urls


// that are waiting.
exports.htmlFetcher = function() {

  var urlsToDownload = [];

  var helper = function(err, data, url, isLast) {
  //pass in callback(err, data)
    //if(err)
    if(err) {
      // push url to storage array
      console.log('should go in here cause doesnt find site', url);
      urlsToDownload.push(url);
      console.log("This is the accumulated Array of URLs which have to be downloaded: ", urlsToDownload);
      if(isLast){
        archive.downloadUrls(urlsToDownload);
      }
    }
  };
  // storage array
  console.log("inside html fetcher");
  // call list of URLs from readListOfUrls
  archive.readListOfUrls(function(arrays, err){
    if(err) throw err;
    //in the callback:
    // for each url 
    for(var i = 0; i < arrays.length; i++){
      //call isUrlArchived for each URL
      var url = arrays[i];
      var isLast = (i === arrays.length-1);
      console.log("AIAIAIAI",url);
      archive.isUrlArchived(url, helper, isLast);
    }
    // call downloadUrls with storage array
    // archive.downloadUrls(urlsToDownload);
  });
  setTimeout(exports.htmlFetcher, 2000);
};

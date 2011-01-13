var iTunesSearch = {
  basicMetadataURL: function(showName, country) {
    if (country == null) {
      country = "us";
    }
    var url = "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?term=";
    url = url + showName + "&media=tvShow&entity=tvSeason&attribute=tvSeasonTerm&country=" + country;
    return url;
  },
  
  imageURLofSize: function(originalUrl, size) {
    // http://a1.phobos.apple.com/us/r1000/048/Video/ef/91/c4/mzl.abwgnxhv.60x60-50.jpg
    // valid sizes seem to be 100, 170, 110, 200
    var sizeStr = size.toString() + 'x' + size.toString();
    var newURL =  originalUrl.replace(/\d+x\d+/, sizeStr);
    console.log("newURL: " + newURL);
    return newURL;
  },  
  
  showHTMLFromResult: function(result) {
    var html = '<li id="' + result.collectionId + '">';
    html = html + "<h2>" + result.collectionName + '</h2>';      
    html = html + "<a href=\"" + result.collectionViewUrl + "\" target=\"_new\">";
    html = html + "<img src=\"" + iTunesSearch.imageURLofSize(result.artworkUrl100, 200) + '\" />';                
    html = html + "</a>";
//    html = html + "<p>" + result.collectionName + '</p>';                
    
    html = html + "</li>";            
    
    return html;
  },
};
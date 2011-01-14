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
  
  delay: 300.0,
  
  keyupCallback: function() {
     var text = $('#show_title').val();
     
     if (text.length == 0) {
       $('#results').empty();
       return;
     }
     
     if (text.length >= 3) {
       var queryURLs = [];
       queryURLs.push(iTunesSearch.basicMetadataURL(text, "us"));
       queryURLs.push(iTunesSearch.basicMetadataURL(text, "de"));
       queryURLs.push(iTunesSearch.basicMetadataURL(text, "uk"));        

				if (iTunesSearch.timer) {
					clearTimeout(iTunesSearch.timer);
				}
				
				iTunesSearch.timer = setTimeout(function() {
          
          $('#results').empty();
          
          for (var i=0; i < queryURLs.length; i++) {
            console.log("will fire ajax");
            $.ajax({
              dataType: 'jsonp',
              url: queryURLs[i],
              success: function (data) {  
                var results = data.results;
          
                console.log("got " + results.length + " results");
          
                var index;
                for (index = 0; index < results.length; index++) {
                  var result = results[index];
                  if ($('#' + result.collectionId.toString()).length == 0) {
                    $('#results').append(iTunesSearch.showHTMLFromResult(result));                
                  }
                }
              }
            });				  
          }
        }, iTunesSearch.delay);    
     }
   },
}; // iTunesSearch


$(document).ready(function(){
   $('#show_title').keyup( iTunesSearch.keyupCallback );
});
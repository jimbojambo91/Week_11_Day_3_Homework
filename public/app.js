var app = function(){
  // var url = "https://api.spotify.com/v1/search?q=rap&type=album"
  // makeRequest(url, requestComplete);

  var input = document.getElementById('search-query');
  input.addEventListener("keyup", handleInputKeyPress)

}

var handleInputKeyPress = function(){
  search = this.value;
  // search = search.replace(/\s/g, '');
  var url = "https://api.spotify.com/v1/search?q=" + search + "&type=album";
  console.log(url)
  makeRequest(url, requestComplete);
}

var requestComplete = function(){
  //THIS REFERS TO XMLHTTPREQUEST JUST NOW
  if(this.status === 400){
    var outer_div = document.getElementById("albums")
    outer_div.innerHTML = "";
  }
  if(this.status !== 200) return;


  var jsonString = this.responseText;
  var albums = JSON.parse(jsonString);
  albums = albums.albums.items;
 
  populateList(albums); 
}

var populateList = function(albums){
  var outer_div = document.getElementById("albums")
  outer_div.innerHTML = "";
  albums.forEach(function(album){
    var div = document.getElementById('albums')
    var ul = document.createElement('ul');
    var name_li = document.createElement('li');
    var artist_li = document.createElement('li');
    var album_art_li = document.createElement('li');
    var album_art = document.createElement('img')
    var link_li = document.createElement('li');
    var link = document.createElement('a');

    name_li.innerText = "Album name: " + album.name;
    artist_li.innerText = "Aritst: " + album.artists[0].name;
    album_art.setAttribute("src", album.images[1].url)
    album_art.setAttribute("height", album.images[1].height)
    album_art.setAttribute("width", album.images[1].width)
    link.innerText = "Listen on Spotify";
    link.setAttribute("href", album.artists[0].external_urls.spotify);


    album_art_li.appendChild(album_art)
    link_li.appendChild(link);
    ul.appendChild(name_li);
    ul.appendChild(artist_li);
    ul.appendChild(album_art_li);
    ul.appendChild(link_li);
    div.appendChild(ul);
  });

}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

window.addEventListener('load', app);
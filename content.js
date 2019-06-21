$(document).ready(function() {
  $(".movie-name > a").each(function(i, obj) {
    let omdbapi =
      "http://www.omdbapi.com/?t=" +
      obj.innerHTML +
      "&y=" +
	  new Date().getFullYear() +
      "&apikey={{YOUR API KEY}}";

    $.get(omdbapi, function(data) {
      console.log(data);
      if (data.Error || !data.Ratings) return;

      data.Ratings.forEach(element => {
        if (element.Source === "Internet Movie Database") {
          obj.innerHTML = obj.innerHTML + "<br>IMDB: " + element.Value;
        }
        if (element.Source === "Rotten Tomatoes") {
          obj.innerHTML =
            obj.innerHTML + "<br>Rotten Tomatoes: " + element.Value;
        }
        if (element.Source === "Metacritic") {
          obj.innerHTML = obj.innerHTML + "<br>Meta: " + element.Value;
        }
      });
    });
  });
});

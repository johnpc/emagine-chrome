let api_key = "{{YOUR_API_KEY_HERE}}";
function buildIMDbUrl(imdb_id) {
  return "https://www.imdb.com/title/" + imdb_id;
}

function buildRottenTomatoesUrl(movie_name) {
  let rotten_tomatoes_id = movie_name
    .replace(/[^a-z0-9]+/gi, " ")
    .toLowerCase()
    .split(" ")
    .join("_");

  return "https://www.rottentomatoes.com/m/" + rotten_tomatoes_id;
}

function buildMetacriticUrl(movie_name) {
  let metacritic_id = movie_name
    .replace(/[^a-z0-9]+/gi, " ")
    .toLowerCase()
    .split(" ")
    .join("-");

  return "https://www.metacritic.com/movie/" + metacritic_id;
}

function getIMDbContent(data) {
  let content = "";
  // Can only be added if api was good because it uses a generated id
  if (data.Error || !data.Ratings) return content;

  content = "</a><br><a href=" + buildIMDbUrl(data.imdbID) + ">IMDb";

  data.Ratings.forEach(element => {
    if (element.Source === "Internet Movie Database") {
      content = content + ": " + element.Value + "</a>";
    }
  });

  content = content + "</a>";
  return content;
}

function getRottenTomatoesContent(data, movie_name) {
  let content =
    "</a><br><a href=" +
    buildRottenTomatoesUrl(movie_name) +
    ">Rotten Tomatoes";

  if (data.Error || !data.Ratings) return content;

  data.Ratings.forEach(element => {
    if (element.Source === "Rotten Tomatoes") {
      content = content + ": " + element.Value;
    }
  });

  content = content + "</a>";
  return content;
}

function getMetacriticContent(data, movie_name) {
  let content =
    "</a><br><a href=" + buildMetacriticUrl(movie_name) + ">Metacritic";

  if (data.Error || !data.Ratings) return content;

  data.Ratings.forEach(element => {
    if (element.Source === "Metacritic") {
      content = content + ": " + element.Value;
    }
  });

  content = content + "</a>";
  return content;
}

function getMovieName(raw_movie_name) {
  // Remove parens (ie. "Toy Story 4 (3D EMAX)" should just be "Toy Story 4")
  let index = raw_movie_name.indexOf("(");
  return raw_movie_name.substring(
    0,
    index != -1 ? index - 1 : raw_movie_name.length
  );
}

$(document).ready(function() {
  document.getElementsByClassName('js-showtimes')[0].click();
  setTimeout(() => {
    console.log('hi');
    const movieCount = $("#js-ShowtimesModal > div > div.showtimes.page-content.page-content--short > div > div").length;
    console.log("movieCount", movieCount);
    for (let i = 0; i < movieCount; i++){
      const movie_name = getMovieName($("#js-ShowtimesModal > div > div.showtimes.page-content.page-content--short > div > div")[i].children[0].children[0].children[1].innerText);
      let omdbapi =
      "https://www.omdbapi.com/?t=" +
      movie_name +
      "&y=" +
      new Date().getFullYear() +
      "&apikey=" +
      api_key;

    $.get(omdbapi, function(data) {
      const obj = $("#js-ShowtimesModal > div > div.showtimes.page-content.page-content--short > div > div")[i].children[0].children[0].children[1];
      console.log(data);
      obj.innerHTML =
        obj.innerHTML +
        "<br>" +
        getIMDbContent(data) +
        getMetacriticContent(data, movie_name) +
        getRottenTomatoesContent(data, movie_name);
    });
    }
  }, 1000)
});

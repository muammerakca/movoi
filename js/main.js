$(document).ready(function () {
  $("#movie-title-search").focus();
  $(".no-results").hide();
});


$("#find-movie").click(function () {
  getMovie();
  setLoading();
})

$('#movie-title-search').on('keypress', function (e) {
  if (e.which === 13) {
    getMovie();
    setLoading();
  }
});

$()
function getMovie() {
  var mTitle = $("#movie-title-search").val();
  var apiKey = "cfcb4f93";

  var movieTitle = $(".movie-title");
  var movieYear = $(".movie-year");
  var moviePoster = $(".movie-poster");
  var moviePlot = $(".movie-plot");
  var movieDirectors = $(".movie-directors");
  var movieActors = $(".movie-actors");
  var movieGenres = $(".movie-genres");
  var movieWriters = $(".movie-writers");
  var movieRuntime = $(".movie-runtime");
  var movieCountry = $(".movie-country");
  var movieAwards = $(".movie-awards");
  var movieRatingIMDb = $(".movie-rating-imdb");
  var movieRatingRottenTomatoes = $(".movie-rating-rotten-tomatoes");
  var movieRatingMetacritic = $(".movie-rating-metacritic");

  $.getJSON(
    'https://www.omdbapi.com/?t=' + mTitle + '&plot=full&apikey=' + apiKey
  )
    .done(function (Movie) {
      setDone()

      if (Movie.Response === "True") {
        $(".movie-info").fadeIn("100");
        $(".no-results").hide("100");

        movieTitle.text(Movie.Title)
        movieYear.text(Movie.Year + " - Released at " + Movie.Released)
        moviePoster.attr("src", Movie.Poster)
        moviePlot.text(Movie.Plot)
        movieDirectors.text(Movie.Director)
        movieActors.text(Movie.Actors)
        movieGenres.text(Movie.Genre)
        movieWriters.text(Movie.Writer)
        movieRuntime.text(Movie.Runtime)
        movieCountry.text(Movie.Country)
        movieAwards.text(Movie.Awards)
        movieRatingIMDb.text(Movie.Ratings[0].Value)
        movieRatingRottenTomatoes.text(Movie.Ratings[1].Value)
        movieRatingMetacritic.text(Movie.Ratings[2].Value)
      } else if (Movie.Response === "False") {
        $(".movie-info").hide("100");
        $(".no-results").fadeIn("100");
        $(".movie-poster").attr("src", "img/def-poster.jpg")
      }
    })
}

function setLoading() {
  $("#find-movie").attr("disabled", 'disabled');
  $("#find-movie").text("LOADING...");
}

function setDone() {
  $("#find-movie").removeAttr('disabled');
  $("#find-movie").text("FIND MOVIE");
  $("#movie-title-search").val("")
}

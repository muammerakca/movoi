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

  $.getJSON(
    'http://www.omdbapi.com/?t=' + mTitle + '&plot=full&apikey=' + apiKey
  )
    .done(function (Movie) {
      setDone()

      if (Movie.Response === "True") {
        $(".movie-info").fadeIn("100");
        $(".no-results").hide("100");

        movieTitle.text(Movie.Title)
        movieYear.text(Movie.Year)
      } else if (Movie.Response === "False") {
        $(".movie-info").hide("100");
        $(".no-results").fadeIn("100");
      }

      // Foreach
      //$.each(users, function(key, value) {
      //$("#users").append("<li>" + value.real_name + "," + value.last_name + "</li>")
      //});
    })
    .fail(function (jqxhr, textStatus, error) {
      console.log("Bir hata oluştu. " + err);
    });
}

function setLoading() {
  $("#find-movie").attr("disabled", 'disabled');
  $("#find-movie").text("LOADING...");
}

function setDone() {
  $("#find-movie").removeAttr('disabled');
  $("#find-movie").text("FIND MOVIE");
  ;
}
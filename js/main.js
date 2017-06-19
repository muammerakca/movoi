var sidebarMovies = $(".sidebar-movies");
var apiKey = "cfcb4f93"

$(document).ready(function () {
  $("#movie-title-search").focus();
  $(".no-results").hide();

  loadLocalStoragedMovies()
});


$("#find-movie").click(function () {
  getMovies();
  setLoading();
});


$("#movie-title-search").on('keypress', function (e) {
  if (e.which === 13) {
    getMovies();
    setLoading();
  }
});

// $(".close-popup").click(function () {
//   $(".movie-info").fadeOut(200);
//   $(".popup-overlay").fadeOut(200);
// });
//
// $(".popup-overlay").click(function () {
//   $(".movie-info").fadeOut(200);
//   $(".popup-overlay").fadeOut(200);
// });

function getMovies() {
  var mTitle = $("#movie-title-search").val();
  var movieContainer = $('.search-movie-list')
  var noMovieheader = $('.no-movie-header');

  noMovieheader.show();
  $('.no-movie-header p').text("Searching...");

  // Veri varsa boşaltalım
  movieContainer.html("");

  $.getJSON(
    'https://www.omdbapi.com/?s=' + mTitle + '&apikey=' + apiKey
  )
    .done(function (Movies) {
      setDone()
      $.each(Movies.Search, function (key, value) {
        if (Movies.Response === 'True') {
          noMovieheader.hide();
          movieContainer.append(
            '<li class="movie-item">' +
            '<img src="' + value.Poster + '" class="search-list-poster">' +
            '<h1>' + value.Title + '</h1>' +
            '<h2>' + value.Year + '</h2>' +
            '<a class="open-details" href="#" data-imdb="' + value.imdbID + '" onClick="getMovieFromIMDbID(this)">Details</a>' +
            '<a class="add-to-list" href="#" data-title="' + value.Title + '" data-imdb-id="' + value.imdbID + '" onClick="addToList(this)">Add To List</a>' +
            '</li>'
          )
        } else {
          noMovieheader.show();
          $('.no-movie-header p').text("No titles found.");
        }
      })
    })
}

function getMovieFromIMDbID(e) {
  $('.movie-info').hide();
  $('.sidebar-movie-info-loading').show();

  var movieID = e.getAttribute('data-imdb');
  var IMDbId = movieID;

  $.getJSON(
    'https://www.omdbapi.com/?i=' + IMDbId + '&apikey=' + apiKey
  )
    .done(function (Movie) {

      $('.sidebar-movie-info-loading').hide();
      $('.movie-info').show();

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

      if (Movie.Response === "True") {
        movieTitle.text(Movie.Title);
        movieYear.text(Movie.Year);
        moviePoster.attr("src", Movie.Poster);
        moviePlot.text(Movie.Plot);
        movieDirectors.text(Movie.Director);
        movieActors.text(Movie.Actors);
        movieGenres.text(Movie.Genre);
        movieWriters.text(Movie.Writer);
        movieRuntime.text(Movie.Runtime);
        movieCountry.text(Movie.Country);
        movieAwards.text(Movie.Awards);
        movieRatingIMDb.text(Movie.Ratings[0].Value);
        movieRatingRottenTomatoes.text(Movie.Ratings[1].Value);
        movieRatingMetacritic.text(Movie.Ratings[2].Value);
      } else if (Movie.Response === "False") {
        // False
      }
    })
}
// function sliderResize() {
//   var sWidth = $(".sw-container").width();
//   $(".movie-item").css("width", sWidth);
//
//   var slideCount = $(".movie-slider li").length;
//   var slideWidth = $(".movie-item").width();
//   var slideHeight = $(".movie-item").height();
//
//   $('.movie-slider').css("width", slideCount * slideWidth, "height", slideHeight);
//   $('.mv-slider').css("width", sWidth);
//   $('.movie-slider').css("left", "0px");
//
// }
// function prevItem() {
//   var mvSlider = $(".movie-slider")
//   var mvSliderWidth = $(".movie-item").width();
//
//   $(mvSlider).animate({
//     left: + mvSliderWidth
//   }, 200, function () {
//     $('.movie-slider li:last-child').prependTo('.movie-slider');
//     $('.movie-slider').css('left', '');
//   });
// }
//
// function nextItem() {
//   var mvSlider = $(".movie-slider")
//   var mvSliderWidth = $(".movie-item").width();
//
//   $(mvSlider).animate({
//     left: - mvSliderWidth
//   }, 200, function () {
//     $('.movie-slider li:first-child').appendTo('.movie-slider');
//     $('.movie-slider').css('left', '');
//   });
// }
function setLoading() {
  $("#find-movie").attr("disabled", 'disabled');
}

function setDone() {
  $("#find-movie").removeAttr('disabled');
  $("#movie-title-search").val("");
}
function addToList(e) {
  var movieTitle = e.getAttribute('data-title');
  var movieIMDbId = e.getAttribute('data-imdb-id');

  // Film listede varsa uyarı verelim, yalnız bunu IMDb id ile yapsak daha sağlıklı çünkü aynı isimle filmler var.
  if (localStorage.getItem(movieTitle) === null) {
    localStorage.setItem(movieTitle, movieIMDbId);
    showNotification();
    loadLocalStoragedMovies()
  } else {
    alert("This movie is already in your list.")
  }
}

function loadLocalStoragedMovies() {
  var sidebarHolder = $(".sidebar-no-movies");
  var clearListButton = $(".clear-sidebar-movie-list");

  if (localStorage.length > 0) {
    sidebarHolder.hide();
    clearListButton.show();
    loadStoraged()
  } else {
    sidebarHolder.show();
    clearListButton.hide();
  }
}

function loadStoraged() {
  sidebarMovies.html("");
  $.each(localStorage, function (key, value) {
    sidebarMovies.append(
      '<li class="sidebar-movie-item" href="" data-imdb="' + value + '" onClick="getMovieFromIMDbID(this)"><i class="fa fa-film si-i"></i> ' + key + '</li>'
    )
  })

  checkLocalStoragecount();
}

function clearLocalStorage() {
  if (confirm('Are you sure you want to clear your movie list?')) {
    localStorage.clear();
    sidebarMovies.html("");
    loadLocalStoragedMovies()
    checkLocalStoragecount();
  } else {

  }
}
function checkLocalStoragecount() {
  if (localStorage.length === 0) {
    $(".m-count").hide()
  } else {
    $(".m-count").text(localStorage.length);
  }
}
function showNotification() {
  $('.notification').fadeIn(300);
  setTimeout(function () {
    $('.notification').fadeOut(300);
  }, 1000);
}
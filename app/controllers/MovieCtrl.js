"use strict";

MovieHistory.controller("MovieCtrl", [
  "$scope",
  "movieFactory",
  "post-movies",

  function ($scope, getMovies, postMovies)  {

    $scope.searchSuccessful = false;

    $scope.movieToSearch = "";

    $scope.userMovies = [];

    $scope.OMDBMovies = [];

    $scope.moviesToDisplay = [];

    $scope.movieToAdd = {
      poster: "",
      title: "",
      year: "",
      actors: [],
      user: null,
      rating: 0,
      watched: false,
    }


    $scope.search = () => {
      $scope.searchSuccessful = false;
      console.log('searching');
      let movie = $scope.movieToSearch;
      console.log(movie);
      movie = movie.toLowerCase();
      getMovies.searchUserMovies()
      .then(
        userMovieData => {
          let arr = [];
          for (let key in userMovieData) {
            userMovieData[key].movie.key = key;
            arr.push(userMovieData[key]);
          }
          $scope.userMovies = arr;
          arr.forEach((el, i) => {
            let movieTitle = el.movie.title.toLowerCase();
            if (movieTitle === movie) {
              console.log('Found a match on Firebase:', el);
              $scope.movieToAdd.poster = el.movie.poster;
              $scope.movieToAdd.title = el.movie.title;
              $scope.movieToAdd.year = el.movie.year;
              $scope.movieToAdd.user = el.movie.user;
              $scope.movieToAdd.actors = el.movie.actors;
              $scope.searchSuccessful = true;
              return el;
            }
          });
          if ($scope.searchSuccessful === false) {
            console.log('search this movie on OMDB:', movie);
            return getMovies.searchOMDBMovies(movie);
          }
        },
        error => console.log(error)
      ).then(
        function (OMDBMovieData) {
          if (OMDBMovieData) {
            $scope.searchSuccessful = true;
            $scope.movieToAdd.poster = OMDBMovieData.Poster;
            $scope.movieToAdd.title = OMDBMovieData.Title;
            $scope.movieToAdd.year = OMDBMovieData.Year;
            $scope.movieToAdd.user = null;
            $scope.movieToAdd.actors = OMDBMovieData.Actors.split(',');
          } else {
            console.log('no API call made to OMDB');
          }
        },
        error => console.log(error)
        )
    }

  }
]);

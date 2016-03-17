"use strict";

MovieHistory.controller("MovieCtrl", [
  "$scope",
  "movieFactory",
  "post-movies",
  "update-movie",

  function ($scope, getMovies, postMovies, updateMovie)  {

    $scope.searchSuccessful = false;

    $scope.movieToSearch = "";

    $scope.userMovies = [];

    $scope.OMDBMovies = [];

    $scope.searchResults = [];

    $scope.watchedMovies = [];
    $scope.displayWatchedMovies = false;

    $scope.unwatchedMovies = [];
    $scope.displayUnwatchedMovies = false;

    $scope.displayUntrackedMovies = false;

    $scope.favoriteMovies = [];
    $scope.displayFavorites = false;

    let movieToAdd = {
      poster: "",
      title: "",
      year: "",
      actors: [],
      user: null,
      rating: 0,
      watched: false,
    }


    $scope.search = () => {
      $scope.showUntrackedMovies();
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
              movieToAdd.poster = el.movie.poster;
              movieToAdd.title = el.movie.title;
              movieToAdd.year = el.movie.year;
              movieToAdd.user = el.movie.user;
              movieToAdd.actors = el.movie.actors;
              $scope.searchResults[0] = movieToAdd;
              $scope.searchSuccessful = true;
              return el;
            }
          });
          if ($scope.searchSuccessful === false) {
            console.log('search this movie on OMDB:', movie);
            return getMovies.searchOMDBMovies(movie);
          }
          console.log('search results', $scope.searchResults);
        },
        error => console.log(error)
      ).then(
        function (OMDBMovieData) {
          if (OMDBMovieData) {
            $scope.searchSuccessful = true;
            movieToAdd.poster = OMDBMovieData.Poster;
            movieToAdd.title = OMDBMovieData.Title;
            movieToAdd.year = OMDBMovieData.Year;
            movieToAdd.user = null;
            movieToAdd.actors = OMDBMovieData.Actors.split(',');
            $scope.searchResults[0] = movieToAdd;
          } else {
            console.log('no API call made to OMDB');
          }
          console.log('search results', $scope.searchResults);
        },
        error => console.log(error)
        )
    }

    $scope.addToWatchlist = () => {
      console.log($scope.searchResults[0]);
      postMovies($scope.searchResults[0]);
    }

    // UNTRACKED MOVIES


    $scope.showUntrackedMovies = () => {
      console.log($scope.searchResults);
      $scope.displayUnwatchedMovies = false;
      $scope.displayWatchedMovies = false;
      $scope.displayFavorites = false;
      $scope.displayUntrackedMovies = true;
    }

    // UNWATCHED MOVIES


    $scope.showUnwatchedMovies = () => {
      $scope.userMovies = [];
      getMovies.searchUserMovies()
      .then(
        userMovieData => {
          let arr = [];
          $scope.unwatchedMovies = [];
          for (let key in userMovieData) {
            userMovieData[key].movie.key = key;
            arr.push(userMovieData[key]);
          }
          $(arr).each((i, el) => {
            if (el.movie.watched === false) {
              $scope.unwatchedMovies.push(el);
            }
          });
          $scope.userMovies = arr;
          $scope.displayUnwatchedMovies = true;
          $scope.displayUntrackedMovies = false;
          $scope.displayWatchedMovies = false;
          $scope.displayFavorites = false;
        },
        error => console.log(error)
      )
    }

    $scope.updateRating = ($event, rating) => {
      let urlEndpoint = $event.target.className;
      urlEndpoint += '/movie'
      console.log('rating', rating);
      updateMovie(urlEndpoint, rating);
    }

    $scope.showWatchedMovies = () => {
      getMovies.searchUserMovies()
      .then(
        userMovieData => {
          let arr = [];
          $scope.watchedMovies = [];
          for (let key in userMovieData) {
            userMovieData[key].movie.key = key;
            arr.push(userMovieData[key]);
          }
          $(arr).each((i, el) => {
            if (el.movie.watched === true) {
              $scope.watchedMovies.push(el);
            }
          });
          console.log($scope.watchedMovies);
          $scope.displayUnwatchedMovies = false;
          $scope.displayUntrackedMovies = false;
          $scope.displayFavorites = false;
          $scope.displayWatchedMovies = true;
        },
        error => console.log(error)
      )
    }

    $scope.showFavorites = () => {
      getMovies.searchUserMovies()
      .then(
        userMovieData => {
          let arr = [];
          $scope.favoriteMovies = [];
          for (let key in userMovieData) {
            userMovieData[key].movie.key = key;
            arr.push(userMovieData[key]);
          }
          $(arr).each((i, el) => {
            if (el.movie.rating === 10) {
              $scope.favoriteMovies.push(el);
            }
          });
          console.log($scope.watchedMovies);
          $scope.displayUnwatchedMovies = false;
          $scope.displayUntrackedMovies = false;
          $scope.displayWatchedMovies = false;
          $scope.displayFavorites = true;
        },
        error => console.log(error)
      )
    }
  }
]);

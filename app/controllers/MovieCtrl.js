"use strict";

MovieHistory.controller("MovieCtrl", [
  "$scope",
  "movieFactory",

  function ($scope, searchMovies)  {

    $scope.movieToSearch = "";
    $scope.movies = [];

    $scope.movieToAdd = {
      poster: "",
      title: "",
      year: "",
      actors: [],
      rating: 0,
      watched: false,
    }

    $scope.search = () => {
      console.log('searching');
      let movie = $scope.movieToSearch;
      console.log(movie);
      searchMovies(movie)
      .then(
        movieData => {
          $scope.movieToAdd.poster = movieData.Poster;
          $scope.movieToAdd.title = movieData.Title;
          $scope.movieToAdd.year = movieData.Year;
          $scope.movieToAdd.actors = movieData.Actors.split(',');
          $scope.movies.push($scope.movieToAdd);
          console.log($scope.movies);
        },
        error => console.log(error)
        )
    }

    // // Invoke the promise that reads from Firebase
    // movieFactory().then(
    //   // Handle resolve() from the promise
    //   function (movieCollection) {
    //     Object.keys(movieCollection).forEach(key => {
    //     movieCollection[key].id = key;
    //     $scope.movies.push(movieCollection[key]);
    //   })
    // }
      // Handle reject() from the promise
      // err => console.log(err)
    // );

  }
]);

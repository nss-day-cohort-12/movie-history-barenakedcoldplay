"use strict";

MovieHistory.controller("MovieDetailCtrl",
[
  "$scope",
  "$routeParams",
  "$http",
  "$location",
  "movieFactory",

  function ($scope, $routeParams, $http, $location, movieFactory) {

    // Default properties for bound variables
    $scope.movies = [];
    $scope.selectedMovie = {};

    // Invoke the promise that reads from Firebase
    movieFactory().then(

      // Handle resolve() from the promise
      movieCollection => {
        Object.keys(movieCollection).forEach(key => {
          movieCollection[key].id = key;
          $scope.movies.push(movieCollection[key]);
        });

        $scope.selectedMovie = $scope.movies.filter(movie => movie.id === $routeParams.movieId)[0];
      },

      // Handle reject() from the promise
      err => console.log(err)
    );

    /*
      This function is bound to an ng-click directive
      on the button in the view
    */
    $scope.deleteMovie = () => $http
        .delete(`https://nss-demo-instructor.firebaseio.com/songs/${$routeParams.songId}.json`)
        .then(() => $location.url("/"));
  }
]);

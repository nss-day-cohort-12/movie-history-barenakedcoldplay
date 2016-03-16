"use strict";

MovieHistory.controller("MovieCtrl", [
  "$scope",
  "$location",
  "movieFactory",

  function ($scope, $location, movieFactory)  {
    // Default property values for keys bound to input fields
    $scope.movieSearchText = {name: "", artist: "", album: ""};
    $scope.query = "";
    $scope.movies = [];

    // Invoke the promise that reads from Firebase
    movieFactory().then(
      // Handle resolve() from the promise
      movieCollection => Object.keys(movieCollection).forEach(key => {
        movieCollection[key].id = key;
        $scope.movies.push(movieCollection[key]);
      }),
      // Handle reject() from the promise
      err => console.log(err)
    );

  }
]);

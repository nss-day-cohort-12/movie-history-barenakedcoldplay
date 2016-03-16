"use strict";

MovieHistory.controller("MovieFormCtrl",
[
  "$scope",
  "$location",
  "$http",

  function ($scope, $location, $http)  {

    // Default property values for keys bound to input fields
    $scope.newMovie = {
      name: "",
      year: "",
      actors: ""
    };

    // Function bound to the Add Movie button in the view template
    $scope.addMovie = function () {

      // POST the movie to Firebase
      $http.post(
        "https://moviehistbnc.firebaseio.com/movies.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify({
          name: $scope.newMovie.names,
          year: $scope.newMovie.year,
          actors: $scope.newMovie.actors
        })

      // The $http.post() method returns a promise, so you can use then()
      ).then(
        () => $location.url("/movies/"),      // Handle resolve
        (response) => console.log(response)  // Handle reject
      );
    };
  }
]);

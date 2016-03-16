"use strict";

MovieHistory.factory("movieFactory", ($q, $http) =>
  function makeMovies () {
    return $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get("https://moviehistbnc.firebaseio.com/movies.json")
        .success(
          movieCollection =>
          	{resolve(movieCollection)
          		console.log("SUCCESS", movieCollection);},
          error => reject(error)
        )
    )
    return makeMovies;
});


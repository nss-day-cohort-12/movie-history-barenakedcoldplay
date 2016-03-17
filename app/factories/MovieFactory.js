"use strict";

MovieHistory.factory("movieFactory", ($q, $http) =>
  function searchMovies (movie) {
    movie = movie.replace(/ /g, '+');
    console.log(`http://www.omdbapi.com/?t=${movie}`);
    return $q((resolve, reject) => // Return a promise for our async XHR
      $http.get(`http://www.omdbapi.com/?t=${movie}`)
        .success(
          movieCollection =>
          	{resolve(movieCollection)
          		console.log("SUCCESS", movieCollection);},
          error => reject(error)
        )
    )
    return searchMovies;
});


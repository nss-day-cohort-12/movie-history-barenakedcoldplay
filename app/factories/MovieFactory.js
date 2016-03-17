"use strict";

MovieHistory.factory("movieFactory", function ($q, $http) {

  let getMovies = {};

  getMovies.searchOMDBMovies = (movie) => {
    movie = movie.replace(/ /g, '+');
    return $q((resolve, reject) => // Return a promise for our async XHR
      $http.get(`http://www.omdbapi.com/?t=${movie}`)
        .success(
          movieCollection => {
          	resolve(movieCollection);
          	console.log("SUCCESS", movieCollection);
          },
          error => reject(error)
        )
    )
  }

  getMovies.searchUserMovies = () => {
    return $q((resolve, reject) =>
      $http.get(`https://dreamteam-music-hist.firebaseio.com/movies/.json`)
        .success(
          movieData => {
            resolve(movieData);
            console.log("SUCCESS", movieData);
          },
          error => reject(error)
        )
    )
  }

  return getMovies;
});


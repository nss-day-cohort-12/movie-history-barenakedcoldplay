'use strict';

MovieHistory.factory("post-movies", function ($http, $q) {
	let postMovies = (movie) => {
		movie.user = "-KCwF1J8j17zjGJxCGq_";
		console.log(movie);
		return $q((resolve, reject) => {
			$http.post(`https://dreamteam-music-hist.firebaseio.com/movies/.json`, {movie})
			.success(
	          movie => {
	          	resolve(movie);
	          	console.log("SUCCESS", movie);
	          },
	          error => reject(error)
				)
			});
		}
	return postMovies;
});
'use strict';

MovieHistory.factory('update-movie', function () {
	let updateMovie = (urlSnippet, newRating) => {
		let movieRef = new Firebase(`https://dreamteam-music-hist.firebaseio.com/movies/${urlSnippet}`);
	 	movieRef.update({watched: true});
	 	movieRef.update({rating: newRating});
	 	console.log('you gave the movie a new rating of ', newRating);
	}
	return updateMovie;
})
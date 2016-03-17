'use strict';

MovieHistory.controller("NavCtrl", [
	"$scope",
	"store-variables",

	function ($scope, storeVariables) {

	$scope.movieToSearch = "";

	$scope.storeSearchParams = () => {
		let movie = $scope.movieToSearch;
      	movie = movie.toLowerCase();
      	storeVariables.setVariable(movie);
	}
}]
)
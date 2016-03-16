"use strict";

MovieHistory.factory("ApiFactory", ($q, $http) =>
  () =>
    $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get("http://www.omdbapi.com/?s=" + $scope.search)
  .then(function(response){ $scope.related = response.data;})
  
        .success(
          movieCollection => resolve(movieCollection),
          error => reject(error)
        )
    )
);
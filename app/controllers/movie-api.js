'use strict';

// angular.module('Movie-API', [
//   "$scope",
//   "$location",
//   "$http",
//   "movieFactory",
//   ])
  MovieHistory.controller('MovieController', function($scope, $http){
    $scope.$watch('search', function() {
      fetch();
    });

    $scope.search = "";

    function fetch(){
      $http.get("http://www.omdbapi.com/?t=" + $scope.search)
      .then(function(response){ $scope.details = response.data; });

      $http.get("http://www.omdbapi.com/?s=" + $scope.search)
      .then(function(response){ $scope.related = response.data; });
    }

    $scope.update = function(movie){
      $scope.search = movie.Title;
    };

    $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    }
  });


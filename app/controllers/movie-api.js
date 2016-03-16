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
      $http.get("http://img.omdbapi.com/?apikey=[7c212437]&" + $scope.search)
      .then(function(response){ $scope.details = response.data;});

      $http.get("http://www.omdbapi.com/?s=" + $scope.search)
      .then(function(response){ $scope.related = response.data; });
    }

    $scope.update = function(movies){
      $scope.search = movies.Title;
    };

    $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    }
  });


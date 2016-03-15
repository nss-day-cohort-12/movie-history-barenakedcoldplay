"use strict";

MusicHistory.controller("SongCtrl", [
  "$scope",
  "$location",
  "songFactory",

  function ($scope, $location, songFactory)  {
    // Default property values for keys bound to input fields
    $scope.songSearchText = {name: "", artist: "", album: ""};
    $scope.query = "";
    $scope.songs = [];

    // Invoke the promise that reads from Firebase
    songFactory().then(
      // Handle resolve() from the promise
      songCollection => Object.keys(songCollection).forEach(key => {
        songCollection[key].id = key;
        $scope.songs.push(songCollection[key]);
      }),
      // Handle reject() from the promise
      err => console.log(err)
    );

  }
]);

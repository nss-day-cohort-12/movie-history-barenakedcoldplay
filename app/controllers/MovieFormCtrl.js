"use strict";

MusicHistory.controller("SongFormCtrl",
[
  "$scope",
  "$location",
  "$http",

  function ($scope, $location, $http)  {

    // Default property values for keys bound to input fields
    $scope.newSong = {
      name: "",
      albumName: "",
      albumYear: "",
      artist: ""
    };

    // Function bound to the Add Song button in the view template
    $scope.addSong = function () {

      // POST the song to Firebase
      $http.post(
        "https://nss-demo-instructor.firebaseio.com/songs.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify({
          name: $scope.newSong.name,
          album: {
            name: $scope.newSong.albumName,
            year: $scope.newSong.albumYear,
          },
          artist: $scope.newSong.artist
        })

      // The $http.post() method returns a promise, so you can use then()
      ).then(
        () => $location.url("/songs/"),      // Handle resolve
        (response) => console.log(response)  // Handle reject
      );
    };
  }
]);

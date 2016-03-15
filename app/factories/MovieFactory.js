"use strict";

MusicHistory.factory("songFactory", ($q, $http) =>
  () =>
    $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get("https://nss-demo-instructor.firebaseio.com/songs.json")
        .success(
          songCollection => resolve(songCollection),
          error => reject(error)
        )
    )
);

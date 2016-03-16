"use strict";

MovieHistory.controller("PageCtrl",
[
  "$scope",
  "$location",
  "$http",
  "authenticate",
  "firebaseURL",

  function ($scope, $location, $http, authFactory, firebaseURL) {

    // Local variables
    let ref = new Firebase("https://moviehistbnc.firebaseio.com/");

    $scope.isAuthenticated = () => {
      return authFactory.isAuthenticated();
    };

    /*
      Attempt to register a new user account.
      If successful, immediately log user in.
     */
    $scope.logout = () => {
      console.log("Unauthenticating user");
      ref.unauth();
    };

  }
]);

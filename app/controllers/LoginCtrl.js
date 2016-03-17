"use strict";

MovieHistory.controller("LoginCtrl", [
  "$scope",
  "authenticate",
  "$location",

  function ($scope, Authenticate, $location) {

    $scope.user = {
      email: "",
      password: ""
    };

    $scope.register = function (user) {
      const email = user.email;
      const password = user.password;
      Authenticate.createUser(email, password)
      .then(
        () => Authenticate.loginUser(user.email, user.password),
        (error) => console.log('could not register user')
      ).then(
        () => {
          $location.path('/movies/list');
          console.log('success')
        },
        (error) => console.log('could not authenticate user')
      )
    }

    $scope.login = function (user) {
      Authenticate.loginUser(user.email, user.password)
      .then(
        () => {
          $location.path('/movies/list');
          console.log('done');
        },
        (error) => console.log('could not authenticate user')
      );
    }

  }

]);

"use strict";

/* exported MovieHistory */

let MovieHistory = angular.module("MovieApp", ["ngRoute", "firebase"])
  .constant('firebaseURL', "https://moviehistbnc.firebaseio.com/");

/*
  Define a promise for any view that needs an authenticated user
  before it will resolve (see below)
 */
let isAuth = (authFactory) => new Promise((resolve, reject) => {
  if (authFactory.isAuthenticated()) {
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

/*
  Set up routes for Movie History app
 */
MovieHistory.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.
      when("/", {
        templateUrl: "partials/movie-list.html",
        controller: "MovieCtrl",
        resolve: { isAuth }
      }).
      when("/movies/list", {
        templateUrl: "partials/movie-list.html",
        controller: "MovieCtrl",
        resolve: { isAuth }
      }).
      when("/login", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
      }).
      when("/logout", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
      }).
      when("/movies/new", {
        templateUrl: "partials/movie-form.html",
        controller: "MovieFormCtrl",
        resolve: { isAuth }
      }).
      when("/movies/:movieId", {
        templateUrl: "partials/movie-brief.html",
        controller: "MovieDetailCtrl",
        resolve: { isAuth }
      }).
      otherwise({
        redirectTo: "/"
      });
  }]);

/*
  When the application first loads, redirect the user to the login
  form if there is no authentication
 */
MovieHistory.run([
  "$location",

  ($location) => {
    let movieHistoryRef = new Firebase("https://moviehistbnc.firebaseio.com/");

    movieHistoryRef.onAuth(authData => {
      if (!authData) {
        $location.path("/login");
      }
    });
  }
]);

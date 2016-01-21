/*
 * auth.js
 */
(function() {

  var auth = angular.module('app-auth', []);

  auth.factory('AuthData', function() {

    return {
      username: null, 
      password: null, 
      token: null,
      authenticated: false, 
      admin: false
    };

  });


  auth.controller("AuthController", ['$scope', '$http', '$log', 'AuthData', 'localStorageService', function($scope, $http, $log, authData, localStorageService) {

    $scope.authData = authData;

    // Set the local storage prefix
    //this.config(function (localStorage) {
    //  localStorage.setPrefix('demo');
    //});

    this.login = function() {
      $log.debug("Login called username = " + authData.username + " password = " + authData.password);

      $http({
        method: 'POST',
        url:"/api/authenticate",
        headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        data: "name=" + authData.username + "&password=" + authData.password
      }).success(function(result) {
        $log.debug("HTTP Post worked");
        // Let us check if that worked!
        if (result.success) {
          $log.debug("Got a valid token - saving");
          authData.token = result.token;
          authData.authenticated = true;
          authData.admin = result.admin;

          localStorageService.set('token', result.token);
        } else {
          alert(result.message);
        }
      }).error(function() {
        $log.debug("Got error");
      });
      
    };

    this.logout = function() {
      $log.debug("Logging out");
      authData.username = null;
      authData.password = null;
      authData.token = null;
      authData.authenticated = false;
      authData.admin = false;
    };

    this.isAuthenticated = function() {
      return authData.authenticated;
    };

  } ]);

  auth.directive('appAuth', function() {
    return {
      restrict: 'E', 
      templateUrl: '/auth.html', 
      controller: 'AuthController', 
      controllerAs: 'authCtrl'
    }
  });

})();
/* 
 * vim: ts=2 et
 */

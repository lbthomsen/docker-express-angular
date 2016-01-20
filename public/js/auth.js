/*
 * auth.js
 */
(function() {

  var auth = angular.module('app-auth', []);

  auth.controller("AuthController", function() {

    this.username = null;
    this.password = null;
    this.authenticated = false;

    this.login = function() {
      this.authenticated = true;
    };

    this.logout = function() {
      this.username = null;
      this.password = null;
      this.authenticated = false;
    };

    this.isAuthenticated = function() {
      return this.authenticated;
    };

  });

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

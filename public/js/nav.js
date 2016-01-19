/*
 * nav.js
 */
(function() {

  var nav = angular.module('app-nav', []);

  nav.controller("NavController", function() {

  });

  nav.directive('appNav', function() {
    return {
      restrict: 'E', 
      templateUrl: '/nav.html', 
      controller: 'NavController', 
      controllerAs: 'navCtrl'
    }
  });

})();
/* 
 * vim: ts=2 et
 */

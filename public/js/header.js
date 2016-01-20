/*
 * header.js
 */
(function() {

  var header = angular.module('app-header', []);

  header.controller("HeaderController", function() {

    this.title = "Docker/Expect/Angular Demo";

  });

  header.directive('appHeader', function() {
    return {
      restrict: 'E', 
      templateUrl: '/header.html', 
      controller: 'HeaderController', 
      controllerAs: 'headerCtrl'
    }
  });

})();
/* 
 * vim: ts=2 et
 */

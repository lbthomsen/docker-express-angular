/*
 * nav.js
 */
(function() {

  var nav = angular.module('app-nav', []);

  nav.controller("NavController", function() {

    this.tab = 1;

    this.setTab = function(tab) {
      this.tab = tab;
    };

    this.isSet = function(tab) {
      return this.tab === tab;
    };

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

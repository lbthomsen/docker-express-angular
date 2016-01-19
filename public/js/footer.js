/*
 * footer.js
 */
(function() {

  var footer = angular.module('app-footer', []);

  footer.controller("FooterController", function() {

    this.copyright = "Copyright 2016 Bright Things UN Ltd.";

  });

  footer.directive('appFooter', function() {
    return {
      restrict: 'E', 
      templateUrl: '/footer.html', 
      controller: 'FooterController', 
      controllerAs: 'footer'
    }
  });

})();
/* 
 * vim: ts=2 et
 */

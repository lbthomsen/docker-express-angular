/*
 * app.js
 */
(function() {

  var app = angular.module('docker-express-angular', ['LocalStorageModule', 'app-header', 'app-nav','app-auth','app-footer']);

  app.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('demo');
  }]);


  app.controller("AppController", ['$scope', '$log', 'AuthData', function($scope, $log, authData) {

    $log.debug("AppController Created!");

    $scope.authData = authData;

  }]);

})();
/* 
 * vim: ts=2 et
 */

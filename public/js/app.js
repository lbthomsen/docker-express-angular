/*
 * app.js
 */
(function() {

  var app = angular.module('docker-express-angular', ['app-header', 'app-nav','app-auth','app-footer']);

  app.controller("AppController", ['$scope', '$log', 'AuthData', function($scope, $log, authData) {

    $log.debug("AppController Created!");

    $scope.authData = authData;

  }]);

})();
/* 
 * vim: ts=2 et
 */

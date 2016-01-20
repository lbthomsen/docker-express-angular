/*
 * app.js
 */
(function() {

  var app = angular.module('docker-express-angular', ['app-header', 'app-nav','app-auth','app-footer']);

  app.controller("AppController", function() {

    console.log("AppController called!");

  });

})();
/* 
 * vim: ts=2 et
 */

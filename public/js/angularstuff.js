var app = angular.module('example', ['google.places']);
// Setup a basic controller with a scope variable 'place'
app.controller('MainCtrl', function ($scope) {
  $scope.origin = null;
  $scope.destination = null;
  $scope.departdate = null;

  $scope.searchresults = null;

  $scope.searchnow = function() {

  };

});

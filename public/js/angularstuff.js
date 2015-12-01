var app = angular.module('example', ['google.places']);
// Setup a basic controller with a scope variable 'place'
app.controller('MainCtrl', function ($scope) {
  $scope.origin = null;
  $scope.destination = null;
  $scope.departdate = null;

  $scope.searchresults = null;

  $scope.searchnow = function() {
    $scope.searchresults =
    [
      {
        "airline" : "American",
        "departure" : "ORD",
        "arrival" : "JFK",
        "price" : "200",
        "duration" : "1h20m"
      },
      {
        "airline" : "American",
        "departure" : "ORD",
        "arrival" : "JFK",
        "price" : "200",
        "duration" : "1h20m"
      }

    ]
  };

});

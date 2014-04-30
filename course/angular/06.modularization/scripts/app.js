angular.module('flickrApp', []).
  config(['$routeProvider', function($routeProvider) {
  	$routeProvider
      .when('/photos', 
      {
      	templateUrl: 'partials/photos.html',   
      	controller: 'PhotosCtrl'
      })
      .otherwise({redirectTo: '/photos'});
    }]);
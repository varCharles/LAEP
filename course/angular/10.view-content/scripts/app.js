angular.module('flickrApp', []).
  config(['$routeProvider', function($routeProvider) {
  	$routeProvider
      .when('/photos', 
      {
      	templateUrl: 'partials/photos.html',   
      	controller: 'PhotosCtrl'
      })
      .when('/photo/:photo_id', 
      {
      	templateUrl: 'partials/photo.html',   
      	controller:  'PhotoCtrl'
      })
      .otherwise({redirectTo: '/photos'});
    }]);
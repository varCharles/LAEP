angular.module('flickrApp', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/photos', 
      {
      	templateUrl: 'partials/photos.html',   
      	controller: 'PhotosCtrl'
      }).
      when('/photos/:tag', 
      {
        templateUrl: 'partials/photos.html',   
        controller: 'PhotosCtrl'
      }).
      when('/photo/:photoID', 
      {
      	templateUrl: 'partials/photo.html', 
      	controller: 'PhotoCtrl'
      }).
      otherwise({redirectTo: '/photos'});
}]);
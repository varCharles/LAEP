'use strict';

angular.module('lastfmApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
      })
      .when('/album/:artist/:album',{
        templateUrl: 'views/album.html',
        controller: 'AlbumCtrl'
      })
      .when('/artist/:artist', {
        templateUrl: 'views/main.html',
        controller: 'ArtistCtrl'
      })
      
      .otherwise({
        redirectTo: '/'
      });
  });

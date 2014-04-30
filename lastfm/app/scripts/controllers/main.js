'use strict';

angular.module('lastfmApp')
  .controller('MainCtrl', function ($scope, $http, $location) {
    $scope.showResults = false;

  	$scope.searchArtist = function(){		
  		var props = {
  			url:'http://ws.audioscrobbler.com/2.0/',
  			method:"GET",
  			params: {
  				method:'artist.search',
          limit: 9,
  				artist: $scope.search_term,
  				api_key:'5cd7e60b07258146e0b3da6bc511016a',
  				format:'json'
  			}

  		}
  		$http(props)
  		.success(function(payload){
        $scope.showResults = true;
  			$scope.artist_search_result = payload.results;
  		})
  	}
    $scope.getAlbums = function(){
      var props = {
        url:'http://ws.audioscrobbler.com/2.0/',
        method:"GET",
        params: {
          method:'artist.gettopalbums',
          limit: 4,
          artist: $scope.search_term,
          api_key:'5cd7e60b07258146e0b3da6bc511016a',
          format:'json'
        }

      }
      $http(props)
      .success(function(payload){
        console.log(payload)
        $scope.top_albums_result = payload.topalbums;
      })
    }
  
    $scope.search = function(){
      $scope.searchArtist();
      $scope.getAlbums();

    }
   
    var props = {
        url:'http://ws.audioscrobbler.com/2.0/',
        method:"GET",
        params: {
          method:'chart.getTopArtists',
          limit: 20,
          api_key:'5cd7e60b07258146e0b3da6bc511016a',
          format:'json'
        }

      }
      $http(props)
      .success(function(payload){
        console.log(payload)
        $scope.top_artists = payload.artists;
      })
  })
  .controller('ArtistCtrl', function ($scope, $http, $routeParams) {

  	$scope.artist = $routeParams.artist;

  	var props = {
  			url:'http://ws.audioscrobbler.com/2.0/',
  			method:"GET",
  			params: {
  				method:'artist.getinfo',
  				artist: $scope.artist,
  				api_key:'5cd7e60b07258146e0b3da6bc511016a',
  				format:'json'
  			}

  		}
  		$http(props)
  		.success(function(payload){
	   		$scope.artist = payload.artist;

	   	});

       var props = {
        url:'http://ws.audioscrobbler.com/2.0/',
        method:"GET",
        params: {
          method:'artist.gettopalbums',
          limit: 10,
          artist: $scope.artist,
          api_key:'5cd7e60b07258146e0b3da6bc511016a',
          format:'json'
        }

      }
      $http(props)
      .success(function(payload){
        console.log(payload)
        $scope.top_albums_result = payload.topalbums;
      })




   })
  .controller('AlbumCtrl', function ($scope, $http, $routeParams) {
    $scope.artist = $routeParams.artist;
    $scope.album = $routeParams.album;
    console.log('hoit')

    var props = {
        url:'http://ws.audioscrobbler.com/2.0/',
        method:"GET",
        params: {
          method:'album.getinfo',
          artist: $scope.artist,
          album: $scope.album,
          api_key:'5cd7e60b07258146e0b3da6bc511016a',
          format:'json'
        }

      }
      $http(props)
      .success(function(payload){
        console.log(payload)
        $scope.album = payload.album;

      });



  });


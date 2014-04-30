'use strict';
angular.module('flickrApp')
.controller( 'PhotosCtrl', function($scope, $routeParams, flickrService) {
	$scope.sort_order= 'title';
	
	$scope.loading=true;
	$scope.searchtags = $routeParams.tag || 'green';
    
    $scope.searchPhotos = function( ){
		$scope.loading = true;
		$scope.photos = [];
		flickrService.getPhotos( $scope.searchtags )
		.then( function( payload ){
			$scope.photos = payload;
			$scope.loading= false;
		});
	};

    $scope.searchPhotos();

})
.controller( 'PhotoCtrl', function($scope, $location, $routeParams,flickrService) {

	var photoID = $routeParams.photoID;
	$scope.photo_size = 'medium';

	flickrService.getPhotoMeta( photoID )
	.then(function( payload ){
		$scope.photoMeta = payload;
	});

	flickrService.getPhoto( photoID )
	.then( function( payload ){
		$scope.photo =  payload;
	});

	$scope.setPhotoSize = function( size ){
		$scope.photo_size = size;
	};
	$scope.lookupTags = function( tag ){
		$location.path( '/photos/' + tag );
	};

})
.service('flickrService', function( $http ){
	var api_key, url;

	api_key = '2bb0b524a3e3cbb9ceaea74b30dabf93';
	url = 'http://api.flickr.com/services/rest/';
	
	return {
		getPhotos: function( tags ){
			var params = {
				method: 'flickr.photos.search',
				api_key: api_key,
				per_page: 36,
				format: 'json',
				tags: tags,
				extras: 'url_sq,url_m,description,owner_name',
				jsoncallback: 'JSON_CALLBACK'
			};
			return $http.jsonp(url, { params: params } )
			.then(function(payload){
				return( payload.data.photos.photo );
			});
		},
		getPhotoMeta: function(id){
			var params = {
				method: 'flickr.photos.getInfo',
				api_key: api_key,
				format: 'json',
				photo_id: id,
				jsoncallback: 'JSON_CALLBACK'
			};
			return $http.jsonp(url, { params: params } )
			.then(function(payload){
                 return( payload.data.photo );
			});
		},
		getPhoto: function(id){
			var params = {
				method: 'flickr.photos.getSizes',
				api_key: api_key,
				format: 'json',
				photo_id: id,
				jsoncallback: 'JSON_CALLBACK'
			};
			return $http.jsonp(url, { params: params } )
			.then(function(payload){
				var sizes = {};
				sizes.small		= _.findWhere( payload.data.sizes.size, {'label':'Small'} );
				sizes.medium	= _.findWhere( payload.data.sizes.size, {'label':'Medium'} );
				sizes.large		= _.findWhere( payload.data.sizes.size, {'label':'Original'} );
				return( sizes );
			});
		}
	};

});
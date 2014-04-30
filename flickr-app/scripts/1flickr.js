'use strict';
angular.module('flickrApp')
.controller( 'PhotosCtrl', function($scope, flickrService) {
	$scope.sort_order= 'title';
	$scope.thumb_size= 'thumb';
	$scope.searchtags = 'green'
	$scope.setThumbSize = function( size ){
		$scope.thumb_size = size;
	}
    
    $scope.searchPhotos = function( tags ){
    	console.log('searchPhotos')
    	$scope.photos = flickrService.getPhotos( $scope.searchtags );
    }   


	$scope.photos = flickrService.getPhotos( $scope.searchtags );

}
).service('flickrService', function( $http ){
	var api_key, url;

	api_key = '2bb0b524a3e3cbb9ceaea74b30dabf93';
	url = 'http://api.flickr.com/services/rest/';
	
	return {
		getPhotos: function( tags ){
			var params = {
				method: 'flickr.photos.search',
				api_key: api_key,
				per_page: 12,
				format: 'json',
				tags: tags,
				extras: 'url_sq,url_m',
				jsoncallback: 'JSON_CALLBACK'
			};
			return $http.jsonp(url, { params: params } )
			.then(function(payload){
				return( payload.data.photos.photo )
			});
		},
		getPhoto: function(id){
			var params = {
				method: 'flickr.photos.getInfo',
				api_key: api_key,
				format: 'json',
				photo_id: id,
				jsoncallback: 'JSON_CALLBACK'
			}; 
			return $http.jsonp(url, { params: params } )
			.then(function(payload){
				console.log( payload.data.photo )
			});
		}
	}

})















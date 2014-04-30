angular.module('flickrApp')
.controller( 'PhotosCtrl',function($scope, flickrService) {
	$scope.thumb_size= 'thumb';
	$scope.setThumbSize = function( size ){
	 	$scope.thumb_size = size;
	}
	$scope.searchtags = 'green'; 
	$scope.searchPhotos = function(  ){
    	$scope.photos = flickrService.getPhotos( $scope.searchtags );
    }  
   $scope.searchPhotos();
	 
});
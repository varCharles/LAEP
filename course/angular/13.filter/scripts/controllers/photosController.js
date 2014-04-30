angular.module('flickrApp')
.controller( 'PhotosCtrl',function($scope,$routeParams, flickrService) {
	$scope.thumb_size = 'thumb';
	$scope.searchtags = $routeParams.tag_name || 'green';; 
	$scope.setThumbSize = function( size ){
	 	$scope.thumb_size = size;
	}

	 $scope.searchPhotos = function(  ){
    	$scope.photos = flickrService.getPhotos( $scope.searchtags );
    }  
   $scope.searchPhotos();
	 
});
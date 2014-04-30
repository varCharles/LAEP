angular.module('flickrApp')
.controller( 'PhotosCtrl',function($scope,$routeParams, flickrService) {
	$scope.thumb_size = 'thumb';
	$scope.searchtags = $routeParams.tag_name || 'green';

	$scope.setThumbSize = function( size ){
	 	$scope.thumb_size = size;
	}

	$scope.searchPhotos = function(  ){
		$scope.loading = true;
	 	$scope.photos = [];
    	flickrService.getPhotos( $scope.searchtags )
    	.then(function( payload ){
    		$scope.photos = payload;
    		$scope.loading = false;
    	});
    }  
    $scope.searchPhotos();
	 
});
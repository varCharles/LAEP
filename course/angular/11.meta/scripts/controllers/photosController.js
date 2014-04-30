angular.module('flickrApp')
.controller( 'PhotosCtrl',function($scope,$routeParams, flickrService) {
	$scope.searchtags = $routeParams.tag_name || 'green';; 
	 $scope.searchPhotos = function(  ){
    	$scope.photos = flickrService.getPhotos( $scope.searchtags );
    }  
   $scope.searchPhotos();
	 
});
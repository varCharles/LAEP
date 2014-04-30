angular.module('flickrApp')
.controller( 'PhotosCtrl',function($scope, flickrService) {
	$scope.searchtags = 'green'; 
	$scope.searchPhotos = function(  ){
    	$scope.photos = flickrService.getPhotos( $scope.searchtags );
    }  
   $scope.searchPhotos();
	 
});
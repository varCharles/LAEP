angular.module('flickrApp')
.controller( 'PhotoCtrl',function($scope, $location, $routeParams,flickrService) {
	var photo_id = $routeParams.photo_id;
	$scope.photo_size = 'medium';

	flickrService.getPhoto( photo_id )
	.then( function( payload ){
		$scope.photo =  payload;
	});

	$scope.setPhotoSize = function( size ){
		$scope.photo_size = size;
	};

	flickrService.getPhotoMeta( photo_id )
	.then(function( payload ){
		$scope.photoMeta = payload;
	});
	 
});
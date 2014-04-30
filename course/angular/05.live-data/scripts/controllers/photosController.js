function PhotosCtrl($scope, $http) {
	$scope.thumb_size= 'thumb';
	$scope.setThumbSize = function( size ){
	 	$scope.thumb_size = size;
	}

	api_key = '2bb0b524a3e3cbb9ceaea74b30dabf93';
	url = 'http://api.flickr.com/services/rest/';

	var params = {
		method: 'flickr.photos.search',
		api_key: api_key,
		per_page: 36,
		format: 'json',
		tags: 'green',
		extras: 'url_sq,url_m,description,owner_name',
		jsoncallback: 'JSON_CALLBACK'
	};
	$http.jsonp(url, { params: params } )
	.success(function(payload){
		console.log( payload )
		$scope.photos =  payload.photos.photo ;
	});
	 
}
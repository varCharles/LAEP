function PhotosCtrl($scope) {
	$scope.thumb_size= 'thumb';
	$scope.setThumbSize = function( size ){
	 	$scope.thumb_size = size;
	}
	 $scope.photos= [
  	   {
  	   	"id":"2862857008",
		"title":"Hydrant Study 3",
		"url_t":"http://farm3.staticflickr.com/2398/2862857008_3f58d9b3bd_t.jpg",
		"url_m":"http://farm3.staticflickr.com/2398/2862857008_3f58d9b3bd.jpg"
		},
		{
		"id":"7566963938",
		"title":"master heartbraker",
		"url_t":"http://farm9.staticflickr.com/8028/7566963938_578a5b33a4_t.jpg",
		"url_m":"http://farm9.staticflickr.com/8028/7566963938_578a5b33a4.jpg"
		},
		{
		"id":"7884200670",
		"title":"",
		"url_t":"http://farm9.staticflickr.com/8038/7884200670_edf53f85fc_t.jpg",
		"url_m":"http://farm9.staticflickr.com/8038/7884200670_edf53f85fc.jpg"
		},
		{
		"id":"8216571290",
		"title":"2012-11-16 15.28.29",
		"url_t":"http://farm9.staticflickr.com/8489/8216571290_28a9baf054_t.jpg",
		"url_m":"http://farm9.staticflickr.com/8489/8216571290_28a9baf054.jpg"
		},
		{
		"id":"8135309000",
		"title":"Nord Colony 8",
		"url_t":"http://farm9.staticflickr.com/8336/8135309000_76ae0b0f5e_t.jpg",
		"url_m":"http://farm9.staticflickr.com/8336/8135309000_76ae0b0f5e.jpg"
		}
   ]
}
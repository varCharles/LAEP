angular.module('flickrApp')
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
				extras: 'url_sq',
				jsoncallback: 'JSON_CALLBACK'
			};
			return $http.jsonp(url, { params: params } )
			.then(function(payload){
				console.log(payload)
				return( payload.data.photos.photo )
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
				sizes.small	= _.findWhere( 
									payload.data.sizes.size, 
									{'label':'Small'} 
								);
				sizes.medium = _.findWhere( 
									payload.data.sizes.size, 
									{'label':'Medium'} 
								);
				sizes.large	= _.findWhere( 
									payload.data.sizes.size, 
									{'label':'Original'} 
								);
				return( sizes );
			});
		}
	}
})


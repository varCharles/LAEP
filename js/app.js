var Tweet = Backbone.Model.extend({});

var TweetsCollection = Backbone.Collection.extend({
	model: Tweet,
	query: 'backbonejs',
	url: function(){
		return 'https://search.twitter.com/search.json?callback=?&q='+this.query;
	},
	initialize: function(){
		this.fetch();
	},
	parse:function( result ){
		return result.results
	}

})

var TweetView = Backbone.View.extend({
	el: '#tweets-app',
	template: _.template( $( '#tweets-template' ).html() ),
	initialize: function(){
		this.searchField = $( '#twit-search' );
	 	this.twitter_list = $( '#tweet-list' );
		this.listenTo( twitterApp, 'add', this.render );
		this.listenTo( twitterApp, 'reset', this.clear)
	},
	events:{
		'click #search-init': 'initSearch'
	},
	render: function( tweet ){
		 this.twitter_list.append( this.template( tweet.toJSON() ) );
	},
	initSearch: function(){
		console.log('init');
		twitterApp.reset();
		twitterApp.query = this.searchField.val();
		twitterApp.fetch();
	},
	clear:function(){
		this.twitter_list.html('');
	}	
})


var twitterApp = new TweetsCollection;
new TweetView;





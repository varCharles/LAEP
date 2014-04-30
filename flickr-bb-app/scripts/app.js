var app = {}

app.PhotoModel = Backbone.Model.extend();
app.PhotoDetailModel = Backbone.Model.extend();

app.PhotosCollection = Backbone.Collection.extend({
  model : app.PhotoModel,
  ajaxOptions: {
    url: 'http://api.flickr.com/services/rest/',
    dataType: 'jsonp',
    data: {
      api_key:'2bb0b524a3e3cbb9ceaea74b30dabf93',
      format:'json',
      per_page:36,
      method:'flickr.photos.search',
      extras:'url_sq,url_m,description,owner_name'
    },
    jsonp: 'jsoncallback'
  },

  parse: function( payload ){
    $('#loading').hide();
    return(payload.photos.photo)
  }
})

app.PhotoMetaCollection = Backbone.Collection.extend({
  model : app.PhotoDetailModel,
  ajaxOptions: {
    url: 'http://api.flickr.com/services/rest/',
    dataType: 'jsonp',
    data: {
      api_key:'2bb0b524a3e3cbb9ceaea74b30dabf93',
      format:'json',
      method:'flickr.photos.getInfo',
    },
    jsonp: 'jsoncallback'
  },

  parse: function( payload ){
    $('#loading').hide();
    return(payload.photo)
  }
})

app.SinglePhotoCollection = Backbone.Collection.extend({
  model : app.PhotoModel,
  ajaxOptions: {
    url: 'http://api.flickr.com/services/rest/',
    dataType: 'jsonp',
    data: {
      api_key:'2bb0b524a3e3cbb9ceaea74b30dabf93',
      format:'json',
      method:'flickr.photos.getSizes',
    },
    jsonp: 'jsoncallback'
  },

  parse: function( payload ){
    var sizes = {};
    sizes.small   = _.findWhere( payload.sizes.size, {'label':'Small'} );
    sizes.medium  = _.findWhere( payload.sizes.size, {'label':'Medium'} );
    sizes.large   = _.findWhere( payload.sizes.size, {'label':'Original'} );
    return( sizes );
    
  }
})

app.AppView = Backbone.View.extend({
  el:'#flickrapp',
  template:_.template( $('#photos-template').html() ) , 
  events:{
    'click #searchinit':  'search'
  },  
  initialize: function(){
    
     this.render();
     this.search();
    //events
     this.listenTo(app.pc, 'add', this.addOne);  
  },
  search:function(){
    $('#photos').html('');
    $('#loading').show();
    var opts = app.pc.ajaxOptions;
    opts.data.tags = $('#searchtags').val();
    app.pc.fetch(opts);
   
  },
  render: function(){
    
    $(this.el).html(this.template);

  },
  addOne: function( photo ){
    var view = new app.ThumbnailView({ model: photo });//create a partial view 
    $('#photos').append( view.render().el);
  }

});
app.ThumbnailView = Backbone.View.extend({
  tagName: 'li',
  className: 'photo columns two alpha omega',
  template:_.template( $('#thumbnail-template').html() ) , 
  render: function(){
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  }
});

app.PhotoImgView = Backbone.View.extend({
  el:'#flickrapp',
  template:_.template( $('#photo-details-template').html() ) , 
  events:{
    'click #photosmall' : 'setPhotoSize',
    'click #photomedium' : 'setPhotoSize',
    'click #photolarge' : 'setPhotoSize',

  },  
  initialize: function(){
     this.listenTo(app.pmc, 'add', this.addMeta);  
     this.listenTo(app.singlePhoto, 'add', this.addPhoto);
     this.render();
  },
  render: function(){
    $(this.el).html(this.template );
  },
  addMeta: function( photo ){
    var view = new app.PhotoMetaView({ model: photo });//create a partial view 
    $('#photo-meta').append( view.render().el);
  },
  addPhoto: function( photo ){
        var view = new app.PhotoView({ model: photo });//create a partial view 
    $('#photo-container').append( view.render().el);
  },
  setPhotoSize:function( evt ){
    console.log(  $(evt.target).data('size') )
  }
})

app.PhotoMetaView = Backbone.View.extend({
  template:_.template( $('#photo-meta-template').html() ) , 
  render: function(){
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  }
});

app.PhotoView = Backbone.View.extend({
  template:_.template( $('#photo-template').html() ) , 
  render: function(){
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  }
});



app.AppRouter = Backbone.Router.extend({
        routes: {
            "photo/:id": "getPhoto",
            "*actions": "defaultRoute" 
        }
    });

app.FlickrRouter = new app.AppRouter();

app.FlickrRouter.on( 'route:getPhoto', function( id ){
  app.pmc = new app.PhotoMetaCollection(  );
  var opts = app.pmc.ajaxOptions;
  opts.data.photo_id = id;

  app.singlePhoto= new app.SinglePhotoCollection(  );
  var opts2 = app.singlePhoto.ajaxOptions;
  opts2.data.photo_id = id;
 

  new app.PhotoImgView();
  
  app.pmc.fetch( opts );
  app.singlePhoto.fetch( opts2 );

})

app.FlickrRouter.on( 'route:defaultRoute', function(){
  app.pc = new app.PhotosCollection ();
  new app.AppView();

})


Backbone.history.start();



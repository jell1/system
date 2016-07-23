define(['jquery', 
    'underscore', 
    'backbone',
    'text!objects/mdModal/templates/base.html'
], function($, _, Backbone, template) {

//the Constructor
var MDModal = function(){
  this.cssOverrideFile = [];
  this.baseCss = 'js/objects/mdModal/css/base.css';
  this.styleTags = [];
  this.modal = $('.ch-container-mdModal');
  this._init();
};
//end of Constructor

//the methods
MDModal.prototype = {
  _init: function(){
    var _this = this,
    loadCss = this._loadCss(new Array(this.baseCss));

    loadCss.done(function(){
      _this._render();  
    });
    
  },
  _loadCss: function(cssArray){
    var def = $.Deferred(),
        _this = this,
        cssArray = cssArray || [];

      cssArray.forEach(function(url, index) {
        //var linkTag = document.createElement("link"),
        var styleTag = document.createElement('style'),
          fileName = getFileName(url),
          theID = 'dynamicCSS' + fileName;

        styleTag.textContent = '@import "' + url + '"';

        //function
        function getFileName(location) {
          var location = location.split('/'),
            theLength = location.length,
            file = location[theLength - 1];

          //split out the extension
          file = file.split('.');

          return file[0];
        }

        styleTag.id = theID;
        document.getElementsByTagName("head")[0].appendChild(styleTag);

        _this.styleTags.push({
          element: styleTag,
          id: theID,
          file: fileName,
          url: url
        });
      });

      if (cssArray.length > 0) {
        var timer = setInterval(function() {
          var counter = 0,
            length = _this.styleTags.length;

          _this.styleTags.forEach(function(obj, index) {
            if (obj.element.sheet.cssRules.length > 0) {
              counter++;
            }
          });

          if (counter === length) {
            clearInterval(timer);
            def.resolve();

          }
        }, 10)
      } else {
        //no css file, just resolve
        def.resolve();
      }

      return def.promise();
  },
  one: function(theEvent, callback){
    $(this.modal).one(theEvent, callback);
  },
  _removeCss: function() {
      this.styleTags.forEach(function(obj, index) {
        $(obj.element).remove();
      });

      this.styleTags = [];
    },
  _render: function(){
    var _this = this;
    $('body').append(_.template(template, {}));
    
    setTimeout(function(){
      _this._cacheReferences()._bindEvents();
    }, 0);
  },
  _cacheReferences: function(){
    this.mask = $('body').find('.ch-mask');
    this.modal = this.model || $('.ch-container-mdModal');
    this.header = this.modal.find('.ch-header-mdModal');
    this.closeBtn = this.modal.find('.ch-close-mdModal');
    this.content = this.modal.find('.ch-content-mdModal');
    
    return this;
  },
  _bindEvents: function(){
    var _this = this;
    $('body').on('click.ch-mdModal', '.ch-close-mdModal', function(){
      _this.hide();
    });
  },
  _removeEvents: function(){
    $('body').off('.ch-mdModal');
  },
  _loadView: function(view, options){
    var def = $.Deferred(),
        _this = this,
        options = options || {};
    
    this._createContainer();

    //extend the options...
    $.extend(options, {el: '.ch-dynamicContainer-mdModal'});
  
    require([view], function(theView){
      _this.theView = new theView(options);
    
      def.resolve();
    });

    return def.promise();
  },
  _createContainer: function(){
    var container = $('.ch-dynamicContainer-mdModal');
    
    if(container.length < 1){
      this.content.html('<div class="ch-dynamicContainer-mdModal clearfix"></div>');
    }

  },
  _resetHTML : function(){
    this.content.children().remove();
  },
  _viewCleanup: function(){
    this.theView.remove();
    this._resetHTML();
  },
  show: function(view, options){
    var loadCss = this._loadCss(options.cssArray),
    _this = this,
    options = options || {};

    this.setTitle(options.title);
    this.setHeaderColor(options.headerColor);
    this.setWidth(options.width);
    //- bring in mask and modal
    this.mask.fadeIn();
    this.modal.css('display', 'block');
    
    //- start loading modal
    this._loadView(view, options).done(function(){
      
    });
  },
  setTitle: function(title){
    var theTitle = title || '&nbsp;';

    this.header.find('h3').html(theTitle);
  },
  setHeaderColor: function(color){
    var theColor = color || '#2B7753';

    this.header.css({'background': theColor});
  },
  setWidth: function(width){
    var theWidth = width || '500px';

    this.modal.css({'width': theWidth});
  },
  hide: function(){
    this.mask.fadeOut();
    this.modal.fadeOut();
    this._viewCleanup();
  }
}
    
    //usually returning the object you created...
    return MDModal;
});

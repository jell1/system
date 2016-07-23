define(['jquery', 
    'underscore', 
    'backbone'
], function($, _, Backbone) {
var ContextMenu = function(options, viewContext){
  var _this = this;

  //load the css
  PM.loadCss(['/js/objects/contextMenu/css/contextMenuCss.css']).done(function(cssTags){
    _this.cssTags = cssTags;
  })
  
  this.viewContext = viewContext;
  this.options = options || [];
  this.id = _.uniqueId('contextMenu_');
  this.container = $('<div class="contextMenuMenu"></div>');
  this.theList = $('<ul class="contextMenuMenu__theList"></ul>');
  this.listItemTemplate = $('<li class="contextMenuMenu__listItem"><a href="#" class="contextMenuMenu__theLink"></a></li>');
  
  //add unique id...
  this.container.attr('id', this.id);
}

ContextMenu.prototype = {
  open: function(optionalMenuItems){
    this.menuItems = optionalMenuItems || this.options.menuItems,
    _this = this;
    
    this.buildListItems(this.menuItems)
      .combine()
      .addToDom();
    
    setTimeout(function(){
      _this.determinePlacement();
      _this.container.css({
        display: 'none',
        visibility: 'visible'
      })
      _this.container.fadeIn();
      _this.addEvents();
    }, 0)
    
  },
  addEvents: function(){
    var _this = this;
    
    setTimeout(function(){
      $('body').one('click', function(){
        _this.destroy();
      });

      $('body').one('click', _this.container.find('.contextMenuMenu__theLink'), function(e){
        //e.currentTarget == body, we need to find the 
        var theObject = _.findWhere(_this.menuItems, {'data-cid': $(e.target).attr('data-cid')})
        
        _this.viewContext.$el.trigger('contextMenu__click', theObject);
      });

    },0);
  },
  addToDom: function(){
    $('body').append(this.container);
    
    return this;
  },
  determinePlacement: function(){
    var theOffSet = this.viewContext.$el.find(this.options.target).offset();
    
    //set the css values
    this.container.css({
      top: theOffSet.top,
      left: theOffSet.left - this.container.width()
    });
    
    return this;
  },
  destroy: function(){
    var _this = this;
    $('#' + _this.id).fadeOut(250, function(){
      _this.container.remove();
      PM.removeCssFiles(_this.cssTags);
      
    })
  },
  combine: function(){
    this.container.append(this.theList);
    
    return this;
  },
  buildListItems: function(data){
    var _this = this;
    data.forEach(function(obj, index){
      var clonedListItem = _this.listItemTemplate.clone();
      
      //add attributes to list item element
      Object.keys(obj).forEach(function(key, keyIndex){
        (key != 'displayValue') ? clonedListItem.find('a').attr(key, obj[key]) : clonedListItem.find('a').html(obj.displayValue);
      });  
      
      //add to the list
      clonedListItem.appendTo(_this.theList);
    });
    
    return this;
  }
};
    
    //usually returning the object you created...
    return ContextMenu;
});

define(['jquery', 
    'underscore', 
    'backbone'
], function($, _, Backbone) {
  var Snack = function(){
  this.containerTemplate = $('<div class="slimSnack"></div>');
  this.containerMessageTemplate = $('<div class="slimSnack__containerMessage"></div>');
  this.messageListTemplate = $('<ul class="slimSnack__messageList"></ul>');
  this.messageItemTemplate = $('<li class="slimSnack__messageItem"></li>');
  this.messageTextTemplate = $('<span class="slimSnack__messageText"></span>');
  this.actionTemplate = $('<span class="slimSnack__action"></span>');
  
  this.animationEnd = 'webkitAnimationEnd.snack mozAnimationEnd.snack MSAnimationEnd.snack oanimationend.snack animationend.snack';
  this.transitionEnd = 'webkitTransitionEnd.snack mozTransitionEnd.snack MSTransitionEnd.snack otranitionend.snack tranitionend.snack';
  
  this.options = {
    showAction: false,
    actionText: 'Undo',
    target: 'body',
    delay: 2000
  }
}

Snack.prototype = {
  buildStructure: function(){
    this.container.append(
        this.containerMessage.append(
          this.messageList.append(
            this.messageItem.append(this.messageText)
          )
        )
    );
    
    if(this.options.showAction){
      this.messageItem.append(this.action);
    }
    this.bindEvents();
    return this;
  },
  cloneTemplates: function(){
    this.container = this.containerTemplate.clone();
    this.containerMessage = this.containerMessageTemplate.clone();
    this.messageList = this.messageListTemplate.clone();
    this.messageItem = this.messageItemTemplate.clone();
    this.messageText = this.messageTextTemplate.clone();
    this.action = this.actionTemplate.clone();
    
    return this;
  },
  show: function(message, options){
    $.extend(this.options, options);
    
    this.cloneTemplates().setMessage(message).buildStructure().dropIn();
  },
  setMessage: function(message){
    this.messageText.text(message);
    
    return this;
  },
  dropIn: function(){
    var _this = this;
    $(this.options.target).append(this.container);
    
    setTimeout(function(){
      _this.container.addClass('slimSnack--close');
    }, this.options.delay)
  },
  remove: function(){
     $('body').off('.snack');
    this.container.remove();
  },
  bindEvents: function(){
    var _this = this;
    $('body').on(this.animationEnd, '.slimSnack--close', function(e){
      if(e.originalEvent.animationName == 'slideClose'){
        _this.remove();
      }
    })
  }
};
    
    //usually returning the object you created...
    return Snack;
});


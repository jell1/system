define(['jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var BaseView = Backbone.View.extend({
        constructor: function(options) {
            //create a place to hold subViews
            this.subView = [];
            this.linkTags = [];
            this.options = options;
            this.cssFile = options.cssFile || [];
            this.animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.transitionEnd = 'webkitTransitionEnd mozTransitionEnd MSTransitionEnd otranitionend tranitionend';
            
            //take over render...
            var childRender = this.render,
            _this = this;

            //override the various methods
            this.render = function() {
                var renderArgs = arguments;
                // changed to apply so we can pass
                // in arguments easier...
                this.loadCss().done(function() {
                    childRender.apply(_this, renderArgs);

                    _this.nextEventLoop(function() {
                        _this.baseViewPostRender();
                    });
                })


            };

            //take over remove, so we can do other cool stuff
            this.childRemove = this.remove;
            this.remove = function() {
                var _this = this;
                this.childRemove.call(this);
                this.removeCssFiles();

                //dump all subviews...
                this.subView.forEach(function(obj, index){
                    obj.view.remove();
                })
                //now call the default backbone remove
                //this.nextEventLoop(function() {
                    Backbone.View.prototype.remove.apply(this, arguments);
                //});
            } //end of remove method

            // Call the the backbone constructor here...
            Backbone.View.apply(this, arguments);
        },
        removeCssFiles: function() {
            this.linkTags.forEach(function(obj, index) {
                $('#' + obj.id).remove();
            });

            this.linkTags = [];
        },
        loadCss: function(cssFile) {
            var def = $.Deferred(),
                _this = this,
                cssFile = (cssFile) ? cssFile : this.cssFile;

            //function
            function getFileName(location) {
                var location = location.split('/'),
                    theLength = location.length,
                    file = location[theLength - 1];

                //split out the extension
                file = file.split('.');

                return file[0];
            }

            cssFile.forEach(function(url, index) {
                //var linkTag = document.createElement("link"),
                var styleTag = document.createElement('style'),
                    fileName = getFileName(url),
                    theID = 'baseViewDynamicCSS_' + fileName;

                if ($('#' + theID).length === 0) {
                    styleTag.textContent = '@import "' + url + '"';



                    styleTag.id = theID;
                    document.getElementsByTagName("head")[0].appendChild(styleTag);

                    _this.linkTags.push({
                        element: styleTag,
                        id: theID,
                        file: fileName,
                        url: url
                    });
                }


            });

            if (cssFile.length > 0) {
                var timer = setInterval(function() {
                    var counter = 0,
                        length = _this.linkTags.length;

                    _this.linkTags.forEach(function(obj, index) {
                        //if (obj.element.sheet.cssRules.length > 0) {
                        //had to reduce this to elemet.sheet for firefox
                        if (obj.element.sheet) {
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
        loadSubView: function(theView, theTarget, options) {

            var _this = this,
                childID = _.uniqueId('subView_'),
                def = $.Deferred(),
                options = options || {},
                viewDef = $.Deferred();

            //if a tagName was included in options, we need to use that,
            //otherwise use a generic container...
            var containerDiv = (!options.tagName) ? $('<div></div>') : $('<' + options.tagName + '>' + '</' + options.tagName + '>');
            containerDiv.attr('id', childID);
            containerDiv.attr('class', options.className || '');
            $(theTarget).append(containerDiv);

            //to avoid possible confusion in backbone framework, lets remove
            //the tagName from the options since we manually created the container
            delete options.tagName;

            //add the el to the options obj, so the view knows where to drop itself...
            $.extend(options, {
                el: '#' + childID
            });

            this.nextEventLoop(function() {
                if (typeof theView === 'string') {
                    //load using require
                    require([theView], function(view) {

                        _this.childView = new view(options);
                        viewDef.resolve();
                    });
                } else {
                    //load using default...
                    _this.childView = new theView(options);
                    viewDef.resolve();
                }

                viewDef.done(function() {
                    _this.subView.push({
                        id: childID,
                        view: _this.childView,
                    });
                });

                if (!options.skipElementsAdded) {
                    //_this.elementsAdded(containerDiv).done(function() {
                    def.resolveWith(_this, [childID]);
                    //});
                } else {
                    def.resolveWith(_this, [childID]);
                }


            });

            return def.promise();
        },
        getSubViewByID: function(theID) {
            var viewObj = _.findWhere(this.subView, {
                id: theID
            });

            return viewObj.view;
        },
        removeAllSubViews: function() {
            var _this = this;
            this.subView.forEach(function(obj, index) {
                obj.view.remove();

                //remove from array
                _this.subView.splice(index, 1);
            });
        },
        removeSubViewByID: function(id) {
            var _this = this,
                obj = _.find(this.subView, {
                    id: id
                }),
                theIndex = _.indexOf(this.subView, obj);

            obj.view.remove();
            this.subView.splice(theIndex, 1);
        },
        nextEventLoop: function(someFunction) {
            var _this = this;
            setTimeout(function() {
                someFunction.call(this);
            }, 0);

        },
        baseViewPostRender: function() {
            var _this = this;

            this.loadFallBacks();

            this.nextEventLoop(function() {
                _this.$el.trigger('renderComplete', {});
            })
        },
        loadFallBacks: function() {
            var _this = this;
            if (!this.dateInputSupport()) {
                //alert('date not supported, load your fallback!')
            }
        },
        dateInputSupport: function() {
            //test for broswer date picker...
            var dateInput = document.createElement('input');
            dateInput.setAttribute('type', 'date');

            return dateInput.type.toLowerCase() === 'date';
        }
    });

    //usually returning the object you created...
    return BaseView;
});
/*
  This fires up the application.  
  It loads the router and calles the initialize method.
*/

define([
        'jquery',
        'underscore',
        'backbone',
        'router',
        'objects/mdModal/mdModal',
        'objects/snack/snack'
    ],
    function($, _, Backbone, Router, MDModal, Snack) {

        return {
            initialize: function() {
                //define our app in the GLOBAL space...
                PM = {};

                PM.getResource = function(url, params) {
                    return (
                        $.ajax({
                            type: 'GET',
                            data: params,
                            dataType: 'text',
                            url: url
                        })
                    )
                };

                PM.isDate = function(value) {
                    /* Super simple (or dumb?) check for date. */
                    var dateParts = (value.indexOf('/') > 0) ? value.split('/').length : value.split('-').length;

                    return (dateParts == 3);
                }

                PM.isNumber = function(value) {
                    var numberPattern = new RegExp(/^-?\d*(\.\d+)?$/);

                    return numberPattern.test(value)
                }

                PM.isPhone = function(value) {
                    var phonePattern = new RegExp(/1?(?:[.\s-]?[2-9]\d{2}[.\s-]?|\s?\([2-9]\d{2}\)\s?)(?:[1-9]\d{2}[.\s-]?\d{4}\s?(?:\s?([xX]|[eE][xX]|[eE][xX]\.|[eE][xX][tT]|[eE][xX][tT]\.)\s?\d{3,4})?|[a-zA-Z]{7})/);

                    return phonePattern.test(value)
                }

                PM.isEmail = function(value) {
                    var emailPattern = /[a-z0-9]+([-+._][a-z0-9]+){0,2}@.*?(\.(a(?:[cdefgilmnoqrstuwxz]|ero|(?:rp|si)a)|b(?:[abdefghijmnorstvwyz]iz)|c(?:[acdfghiklmnoruvxyz]|at|o(?:m|op))|d[ejkmoz]|e(?:[ceghrstu]|du)|f[ijkmor]|g(?:[abdefghilmnpqrstuwy]|ov)|h[kmnrtu]|i(?:[delmnoqrst]|n(?:fo|t))|j(?:[emop]|obs)|k[eghimnprwyz]|l[abcikrstuvy]|m(?:[acdeghklmnopqrstuvwxyz]|il|obi|useum)|n(?:[acefgilopruz]|ame|et)|o(?:m|rg)|p(?:[aefghklmnrstwy]|ro)|qa|r[eosuw]|s[abcdeghijklmnortuvyz]|t(?:[cdfghjklmnoprtvwz]|(?:rav)?el)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])\b){1,2}/;

                    return emailPattern.test(value);
                }

                PM.prettyDate = function(dateTimeString){
                    var theDate = new Date(dateTimeString);

                    return theDate.getFullDate();
                }

                PM.loadCss = function(cssFile) {
                    var def = $.Deferred(),
                    _this = this,
                    linkTags = [];

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
                        var styleTag = document.createElement('style'),
                            fileName = getFileName(url),
                            theID = 'appDynamicCSS_' + fileName;


                        if ($('#' + theID).length === 0) {
                            styleTag.textContent = '@import "' + url + '"';



                            styleTag.id = theID;
                            document.getElementsByTagName("head")[0].appendChild(styleTag);

                            linkTags.push({
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
                                length = linkTags.length;

                            linkTags.forEach(function(obj, index) {
                                //if (obj.element.sheet.cssRules.length > 0) {
                                //had to reduce this to elemet.sheet for firefox
                                if (obj.element.sheet) {
                                    counter++;
                                }
                            });

                            if (counter === length) {
                                clearInterval(timer);
                                def.resolveWith(_this, [linkTags]);

                            }
                        }, 10)
                    } else {
                        //no css file, just resolve
                        def.resolve();
                    }


                    return def.promise();
                };

                PM.removeCssFiles = function(linkTags) {
                    linkTags.forEach(function(obj, index) {
                        $(obj.element).remove();
                    });
                };

                $.fn.serializeObject = function(){
                   var o = {};
                   var a = this.serializeArray();
                   $.each(a, function() {
                       if (o[this.name]) {
                           if (!o[this.name].push) {
                               o[this.name] = [o[this.name]];
                           }
                           o[this.name].push(this.value || '');
                       } else {
                           o[this.name] = this.value || '';
                       }
                   });
                   return o;
                };

                /* --------- DATE PROTOTYPE ---------- */
                Date.prototype.getFullDate = function() {
                    var theMonth = this.getMonth() + 1,
                        theDay = this.getDate(),
                        theFullYear = this.getFullYear();

                    if (theMonth < 10) {
                        theMonth = '0' + theMonth;
                    }

                    if (theDay < 10) {
                        theDay = '0' + theDay;
                    }

                    return theMonth + '/' + theDay + '/' + theFullYear;
                }

                Date.prototype.getMYSQLFullDate = function(ms) {
                    var theMonth = this.getMonth() + 1,
                        theDay = this.getDate(),
                        theFullYear = this.getFullYear();

                    if (theMonth < 10) {
                        theMonth = '0' + theMonth;
                    }

                    if (theDay < 10) {
                        theDay = '0' + theDay;
                    }

                    return theFullYear + '-' + theMonth + '-' + theDay;
                }
                /*-------------------------------------*/

                PM.router = new Router();
                PM.Modal = new MDModal();
                PM.Snack = new Snack();

                //disable link clicks, we want backbone to handle these
                $(document).on('click', '[href]:not("[follow]")', function(e) {
                    e.preventDefault();
                });
                //disable submit clicks, we want backbone to handle these
                $(document).on('click', '[type="submit"], button', function(e) {
                    e.preventDefault();
                });


                $(document).on('click', '[href][follow]', function(e) {
                    var theRoute = $(e.target).attr('href');

                    PM.router.navigate(theRoute, {
                        trigger: true
                    });
                });

                Backbone.history.start();
            }
        };
    });
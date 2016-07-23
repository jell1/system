define(['jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    var Router = Backbone.Router.extend({

        routes: {
            '': 'index',
            'yoda': 'yoda',
            'wedding': 'firstView',
            'portfolio': 'portfolio'
            //'dashboard': 'index',
            //'dashboard/:propID': 'index',
            //'acceptPayment/:raID': 'acceptPayment'
        },


        /*
            These are the 'routes'
        */
        /*
        index: function(propID) {
            var _this = this;
            $.ajax({
                url: '/index.php/properties/property?userID=1',
                type: 'get'
            })
            this.loadView('views/twoPanelIndex', {propID: propID, cssFile: ['/css/twoPanelIndex/twoPanelIndex.css']});

        },
        */
        index: function() {
            this.loadView('views/portfolioView', {
                cssFile: ['/js/css/portfolio.css']
            });
        },
        portfolio: function(){
            this.loadView('views/portfolioView', {
                cssFile: ['/js/css/portfolio.css']
            });
        },
        firstView: function() {
            this.loadView('views/firstView', {
                cssFile: ['/js/css/first.css']
            });
        },
        // ourWedding: function() {
        //     this.loadView('views/ourWeddingView');
        // },
        yoda: function() {
            this.loadView('views/yodaView', {
                cssFile: ['/js/css/yoda.css']
            });

        },
        // acceptPayment: function(raID) {
        //     this.loadView('views/acceptPayment', {
        //         cssFile: ['/css/acceptPayment/acceptPayment.css'],
        //         raID: raID
        //     });
        // },
        /*
            End of 'routes' section
        */

        loadView: function(view, viewOptions) {
            if (this.currentView instanceof Backbone.View) {
                this.currentView.remove();
            }

            var id = _.uniqueId('routerView_'),
                container = $('<div id="' + id + '"><div>'),
                _this = this,
                viewOptions = $.extend(viewOptions, {
                    el: '#' + id
                });

            $('.container-views').append(container);



            require([view], function(theView) {
                _this.currentView = new theView(viewOptions);
            });
        }



    });

    return Router;
});

define(['jquery',
    'underscore',
    'backbone',
    'BaseView',
    'text!templates/details.html'
], function($, _, Backbone, BaseView, template) {
    var detailsView = BaseView.extend({
        initialize: function(options) {
            this.render();
        },
        render: function() {
            var preparedTemplate = _.template(template);

            this.$el.html(preparedTemplate({
                test: 'test'
            }));
        },
        villaSite: function(){
            window.open('https://www.villasiena.cc/');
        },
        hotelSite: function(){
            window.open('http://www.hilton.com/en/hi/groups/personalized/P/PHXCHHF-IROW-20160127/index.jhtml?WT.mc_id=POG');
        },
        events: {
            'click .visit-btn': 'villaSite',
            'click .hotel-link': 'hotelSite'

        }
    });

    //usually returning the object you created...
    return detailsView;
});


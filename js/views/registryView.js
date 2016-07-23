define(['jquery',
    'underscore',
    'backbone',
    'BaseView',
    'text!templates/registry.html'
], function($, _, Backbone, BaseView, template) {
    var registryView = BaseView.extend({
        initialize: function(options) {
            this.render();
        },
        render: function() {
            var preparedTemplate = _.template(template);

            this.$el.html(preparedTemplate({
                test: 'test'
            }));
        },
        targetLink: function(){
            window.open('http://www.target.com/gift-registry/registry/Fk_0XXrfeNIXBKndE0hQ5g');
        },
        pbLink: function(){
            window.open('http://www.potterybarn.com/registry/3723885/registry-list.html?cm_ite=GiftGiver&cm_pla=WCSearchResults&cm_cat=Registry&bnrid=3340801&cm_ven=WedCh');
        },
        events: {
            'click .target-link': 'targetLink',
            'click .pb-link': 'pbLink'
        }
    });

    //usually returning the object you created...
    return registryView;
});


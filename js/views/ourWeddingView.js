define(['jquery',
    'underscore',
    'backbone',
    'BaseView',
    'text!templates/ourWedding.html'
], function($, _, Backbone, BaseView, template) {
    var ourWeddingView = BaseView.extend({
        initialize: function(options) {
            this.render();
        },
        render: function() {
            var preparedTemplate = _.template(template);

            this.$el.html(preparedTemplate({
                test: 'test'
            }));
        },
        loadRegistry: function() {
            PM.Modal.show('views/registryView', {
                title: 'Registry',
                headerColor: '#4F7599',
                width: '600px'
            })
        },
        loadPhotos: function() {
            // PM.Modal.show('views/photosView', {
            //     title: 'Photo Album',
            //     headerColor: '#4F7599',
            //     width: '957px'
            // })

            window.open('https://goo.gl/photos/VCMp14unX8zWpu9N7');

        },
        loadDetails: function(){
          PM.Modal.show('views/detailsView', {
              title: 'Registry',
              headerColor: '#4F7599',
              width: '900px'
          })  
        },
        events: {
            'click .registry-tab': 'loadRegistry',
            'click .photos-tab': 'loadPhotos',
            'click .details-tab': 'loadDetails'
        }
    });

    //usually returning the object you created...
    return ourWeddingView;
});

define(['jquery',
    'underscore',
    'backbone',
    'BaseView',
    'text!templates/yoda.html'
], function($, _, Backbone, BaseView, template) {
    var yodaView = BaseView.extend({
        initialize: function(options) {
            this.render();
        },
        render: function() {
            var preparedTemplate = _.template(template);

            this.$el.html(preparedTemplate({
                test: 'test'
            }));
        },
        translate: function() {
            var _this = this;
            this.yodaText = $('.yoda-text').val();
            console.log(this.yodaText)

            $.ajax({
                url: 'https://yoda.p.mashape.com/yoda', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
                type: 'get', // The HTTP Method
                data: {
                    sentence: this.yodaText
                }, // Additional parameters here
                datatype: 'json',
                success: function(data) {
                    console.log(data)
                    $('.yoda-msg').append(data)
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "NLjsoqkasvmsh7YqR3bxGwvGRc0wp16btTOjsntEINDVRNKRD0")
                }
            }).done(function(){
                $('.yoda-text').val('');
                $('.yodafy').hide();
            })

        },
        process: function(){
            var yodafy = $('.yodafy').show();
            this.translate();
        },
        events: {
            'click .translate': 'process'
        }
    });

    //usually returning the object you created...
    return yodaView;
});

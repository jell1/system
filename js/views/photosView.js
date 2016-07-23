define(['jquery',
    'underscore',
    'backbone',
    'BaseView',
    'text!templates/photos.html'
], function($, _, Backbone, BaseView, template) {
    var photosView = BaseView.extend({
        initialize: function(options) {
            var _this = this;
            this.render();

            // this.container = $('.slider');
            // console.log(this.container)
            // this.nav = $('#slider-nav');

            // this.imgs = this.container.find('img');
            // this.imgWidth = this.imgs[0].width;
            // console.log(this.imgWidth)
            // this.imgsLen = this.imgs.length;
            // console.log(this.imgsLen)
            // this.current = 0;
            // console.log(this.current)

        },
        render: function() {
            var preparedTemplate = _.template(template);

            this.$el.html(preparedTemplate({
                test: 'test'
            }));
        },
        transition: function(coords) {
            console.log(this.container)
            this.container.animate({
                'margin-left': coords || -(this.current * this.imgWidth)
            })

            console.log(-(this.current * this.imgWidth))
        },
        back: function(e) {
            console.log(this.current);
            this.current--;
            this.current = (this.current < 0) ? this.imgsLen - 1 : this.current % this.imgsLen;
            this.transition();
        },
        next: function(e) {
            console.log(this.current)
                // var dir = $(e.currentTarget).attr('[data-dir]').attr()
            this.current++;
            this.current = (this.current < 0) ? this.imgsLen - 1 : this.current % this.imgsLen;
            console.log(this.current)
            this.transition();
        },
        events: {
            // 'click .prev': 'back',
            // 'click .next': 'next'
        }
    });

    //usually returning the object you created...
    return photosView;
});

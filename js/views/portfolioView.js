define(['jquery',
    'underscore',
    'backbone',
    'BaseView',
    'text!templates/portfolio.html'
], function($, _, Backbone, BaseView, template) {
    var portfolioView = BaseView.extend({
        initialize: function(options) {
            this.render();
        },
        render: function() {
            var preparedTemplate = _.template(template);

            this.$el.html(preparedTemplate({
                test: 'test'
            }));

            // $.ajax({
            //     type: 'get',
            //     url: '/index.php/Assets/asset',
            //     dataType: 'JSON'
            // }).done(function(data) {
            //     console.log(data)
            // });



        },
        loadDetails: function() {
            PM.Modal.show('views/detailsView', {
                title: 'Registry',
                headerColor: '#4F7599',
                width: '900px'
            })
        },
        scroll: function(e, target) {
                //finds classes position and navigates there
            if (target) {
                var divPosition = $(target).offset();
            } else {
                var divPosition = $('.projects').offset();
            };

            $('html, body').animate({
                scrollTop: divPosition.top
            }, "slow");
        },
        selectTab: function(e) {
            //gets currenttargets clas
            var target = '.' + $(e.currentTarget).attr("data-class");
            //removes selected class from currently selected tab adds selected class to new selected tab
            $('.selected').removeClass('selected');
            $(e.currentTarget).addClass('selected');
            //scrolls to target
            this.scroll(e, target);
            //resets home as selected
            this.$el.find('.selected').removeClass('selected');
            this.$el.find('.home-tab').addClass('selected');
        },
        codepen: function() {
            window.open('http://codepen.io/jell1/');
        },
        linkedin: function() {
            window.open('http://www.linkedin.com/in/justinleon');
        },
        github: function() {
            window.open('https://github.com/jell1');
        },
        toggleNav: function(e) {
            var target = $(e.currentTarget).find('div');
            target.toggle();
            this.$el.find('.nav-mobile ul').toggle();
            // console.log(target);
        },
        events: {
            'click .fa-chevron-down': 'scroll',
            'click .nav li, .home-sticky, .nav-mobile li': 'selectTab',
            'click .codepen': 'codepen',
            'click .linkedin, .logo': 'linkedin',
            'click .github': 'github',
            'click .mobile-icon': 'toggleNav'

        }
    });

    //usually returning the object you created...
    return portfolioView;
});

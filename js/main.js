// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
    paths: {
        BaseView: 'views/baseViews/baseView',
        backbone: '3rdParty/backbone',
        collections: 'collections',
        //contextMenu: 'objects/contextMenu/contextMenu',
        jquery: '3rdParty/jquery-2.1.4.min',
        models: 'models',
        objects: 'objects',
        templates: '../templates',
        underscore: '3rdParty/underscore',
        views: 'views',
    },
    shim: {
        // "materialize": {
        //     "deps": ['jquery']
        // }
    },

});

require([

    // Load our app module and pass it to our definition function
    'app', //this is the app.js file, relative to this config/main file
], function(app) {
    // The "app" dependency is passed in as "App"
    app.initialize();
});
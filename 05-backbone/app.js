requirejs.config({
    "baseUrl": "/libs/",
    "paths": {
      "app": "../app",
      "titleview":"../views/titleview",
      "moviesview":"../views/moviesview",
      "detailsview":"../views/detailsview",
      "moviemodel":"../models/moviemodel",
      "jquery":"jquery",
      "underscore":"underscore",
      "backbone":"backbone"
    },
    shim:{
      "underscore":{
        exports:"_"
      },
      "backbone":{
        deps:["underscore","jquery"],
        exports:"Backbone"
      }
    }
});

requirejs(["app/main"]);

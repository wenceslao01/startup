requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app"
    },
    "shim": {
        "app/main": ["jquery"]
    }
});

requirejs(["app/main"]);

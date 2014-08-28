/* jshint node:true */
module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    paths : {
      entry  : "example/app.js",
      output : "example/dist/js/bundle.js"
    },

    env : {
      dev : {
        NODE_ENV : "development"
      },
      dist : {
        NODE_ENV : "production"
      }
    },

    uglify : {
      options : {
        report : "gzip",
        compress: {
          unsafe: true
        }
      },
      dist : {
        src  : "<%= paths.output %>",
        dest : "<%= paths.output %>"
      }
    },

    browserify: {
      options: {
        transform: [
          "reactify",
          "envify"
        ]
      },
      dev: {
        src  : "<%= paths.entry %>",
        dest : "<%= paths.output %>",
        options : {
          watch : true,
          bundleOptions : {
            debug : true,
          }
        }
      },
      dist : {
        src  : "<%= paths.entry %>",
        dest : "<%= paths.output %>"
      }
    },

    sass : {
      example : {
        options : {
          style : "compressed"
        },
        src : "example/screen.scss",
        dest : "example/dist/css/screen.css"
      }
    },

    watch : {
      styles : {
        files : ["<%= sass.example.src %>"],
        tasks : ["sass"]
      }
    }

  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-env");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["env:dev", "browserify:dev", "watch"]);
  grunt.registerTask("dist", ["env:dist", "browserify:dist", "sass", "uglify:dist"]);
  
};
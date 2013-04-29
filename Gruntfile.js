'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: "/*!\n" +
        " *  Project: <%= pkg.title || pkg.name %>\n" +
        " *  Version: <%= pkg.version %> (<%= grunt.template.today('yyyy-mm-dd') %>)\n" +
        " *  Description: <%= pkg.description %>\n" +
        " *  Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n" +
        "<%= pkg.homepage ? ' *  Homepage: ' + pkg.homepage + '\\n' : '' %>" +
        " *  License: <%= _.pluck(pkg.licenses, 'type').join(', ') %>\n" +
        "*/\n"
    },
    jshint: {
      options: {
        node: true,
        strict: false
      },
      all: [
        'Gruntfile.js',
        'js/*.js'
      ]
    },
    mincss: {
      all:[
        'css/style.css'    
      ],
      compress: {
        files: {
          'css/concat/style.css': ['css/style.css']
        }
      },
      with_banner: {
        options: {
          banner: '/* My minified css file */'
        },
        files: {
          'css/minified/style-min.css': ['css/concat/style.css']
        }
      }
    },
    concat: {
      index: {
        src: [
          'js/system/pool.manager.js',
          'js/plugin/testPlugin.js',
          'js/plugin/zoomLight.js',
          'js/scope/scope.index.js'
        ],
        dest: 'js/dist/concat/index.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'js/dist/minified/index-min.js': ['js/dist/concat/index.js']
        }
      }
    },
    watch: {
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['buildJS']
      },
      css: {
        files: [
          'css/*.css'
        ],
        tasks: ['buildCSS']
      }
    }
  });

  grunt.loadTasks('build/tasks');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('buildJS', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('buildCSS', ['mincss']);
  grunt.registerTask('default', ['buildJS', 'buildCSS']);

};

const path = require('path');
const pkg = require('./package');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Package.json information
    pkg: pkg,

    // Bundle client-side JS to single bundle
    browserify: {
      app: {
        src: ['app/index.js'],
        dest: 'public/assets/app.bundle.js',
        options: {
          browserifyOptions: {
            transform: [
              ['babelify', { presets: pkg.babel.presets, sourceMap: true }],
              ['envify', { _: 'purge', NODE_ENV: process.env.NODE_ENV }],
              ['uglifyify', { global: false }],
            ],
          }
        }
      }
    },

    // Unit Tests
    mochaTest: {
      app: {
        src: ['app/**/*.spec.js'],
      },
      server: {
        src: ['src/**/*.spec.js']
      },
      options: {
        reporter: 'spec',
        quiet: false,
        noFail: isProduction === false,
      },
    },

    // Test coverage
    coverage: {
      default: {
        options: {
          dir: 'coverage',
          root: __dirname,
        }
      }
    },

    // Lint JS files
    eslint: {
      app: {
        src: ['app/**/*.js'],
        options: {
          configFile: '.eslintrc.js',
          reporter: 'stylish'
        }
      },
      server: {
        src: ['src/**/*.js'],
        options: {
          configFile: '.eslintrc.js',
          reporter: 'stylish'
        }
      },
    },

    // Generate documentation
    jsdoc: {
      dist: {
        src: ['src/**/*.js', 'app/**/*.js'],
        options: {
          destination: 'docs',
        },
      },
    },

    // CSS extensions
    postcss: {
      dist: {
        src: 'app/**/*.css',
        dest: 'public/assets/main.css'
      },
      options: {
        map: {
          inline: false,
          annotation: 'public/assets'
        },
        processors: [
          require('pixrem'),
          require('autoprefixer')({
            browsers: 'last 2 versions',
          }),
          require('cssnano'),
        ]
      },
    },

    // Lint CSS
    stylelint: {
      src: ['app/**/*.css'],
      options: {
        configFile: '.stylelintrc.js',
        formatter: 'string',
        failOnError: isProduction,
      },
    },

    // Remove generated files
    clean: {
      build: [
        'dist',
        'docs',
        'coverage',
        'apidocs',
        'public/assets',
      ],
    },

    watch: {
      app: {
        files: ['app/**/*.js'],
        tasks: [
          'browserify',
          'mochaTest:app',
          'eslint:app',
        ]
      },
      styles: {
        files: ['app/**/*.css'],
        tasks: [
          'postcss',
          'stylelint',
        ],
      },
      server: {
        files: ['src/**/*.js'],
        tasks: [
          'mochaTest:server',
          'eslint:server',
        ]
      },
      options: {
        spawn: false,
        livereload: true,
      },
    },

    // Serve the backend with live reload
    express: {
      livereload: {
        options: {
          port: process.env.PORT || 9000,
          server: path.resolve(__dirname, 'src', 'index.js'),
          livereload: false,
          serverreload: false,
          bases: [
            path.resolve(__dirname, 'public')
          ],
          debug: true,
        }
      },
    },

    // Check NSP for known vulnerabilities
    nsp: {
      package: pkg,
      output: 'summary',
    },
  });

  grunt.registerTask('verify', [
    'mochaTest:app',
    'eslint:app',
    'stylelint',
    'mochaTest:server',
    'eslint:server',
  ]);

  grunt.registerTask('prebuild', [
    'clean',
  ]);

  grunt.registerTask('build', [
    'browserify',
    'postcss',
  ]);

  grunt.registerTask('postbuild', [
    'jsdoc',
    'nsp',
  ]);

  grunt.registerTask('deploy', [
    /** Insert deployment tasks here */
  ]);

  grunt.registerTask('develop', [
    'clean',
    'build',
    'express',
    'watch',
  ]);

  grunt.registerTask('default', [
    'verify',
    'prebuild',
    'build',
    'postbuild',
  ]);
};

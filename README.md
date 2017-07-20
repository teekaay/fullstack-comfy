# Fullstack comfy

  A boilerplate with everything you need and maybe not!

This projects aims at the following goals

* Provide as much automation as possible
* Easy development workflow
* Modern JS tooling
* Early feedback through validation for high-quality code

## Getting started

To get started, run


  yarn install
  yarn run serve


Open `http://localhost:9000` to see the app. You can edit the code in `app`
and immediately see the live reload (assuming you have got a compatible plugin).
Alternatively, run `docker-compose up` to run everything a docker container.

## Technology stack

* Backend is Express with MongoDB as database
* Frontend is ES6 with JQuery and Backbone and PostCSS (can be easily replaced)
* Build automation through Grunt
* LiveReload
* Docker and Docker Compose
* Tests are written with Mocha and Chai
* Git commits are validated through `validate-commit-msg` to follow
  [this](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit) style guide by the Angular.js community
* Git hooks are created with `husky` and run on each commit and push

## Build pipeline

The Grunt tasks to use are intended to mirror the steps of a real build
pipeline. They can be used individually or all together (by specifying no task
to Grunt).

All tasks can be found in `Gruntfile.js`. The npm scripts available are `build`
(runs all Grunt tasks) and `serve` which is for development.

* `verify` does unit tests (app and server), linting (app and server) and
  stylesheet linting
* `prebuild` does security checks (through `nsp`) and cleans generated files
* `build` compiles the frontend code to `public/assets`
* `postbuild` generates documentation
* `deploy` can contain deployment tasks, but does nothing by default

The result is `public/assets` which contains the final CSS and minifies JS
bundles.

For local development, `develop` is the task to go. It includes the backend app
from `src/index.js` (like `server.js`) and includes live reload. Also, it
watches the `app` server and recompiles on changes.


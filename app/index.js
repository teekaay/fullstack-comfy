import Backbone from 'backbone';
import $ from 'jquery';

const View = Backbone.View.extend({
  el: '#greeting',
  initialize() {
    this.render();
  },
  render() {
    this.$el.html(this.template);
  },
  template: `<h1>Hello, Friend</h1>`,
});

new View();

Backbone.history.start();


var declaire = require('declaire');
var _ = declaire.utils;

module.exports = declaire.ViewModel('TodoView', {
  todo: null,
  renaming: false,

  rename: function(e) {
    this.set('renaming', true);
  }
}, function(todo) {
  this.set('todo', todo);
  this.listenTo(todo, 'save revert', function() {
    this.set('renaming', false);
  });
});

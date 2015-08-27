var declaire = require('declaire');

module.exports = declaire.Model('todos', {
  title: 'Untitled Todo',
  done: false,

  rename: function() {
    this.set('renaming', true, {temporary: true});
  }
}, function() {
  var self = this;
  self.on('save', function() {
    self.set('renaming', false, {temporary: true});
  });
});

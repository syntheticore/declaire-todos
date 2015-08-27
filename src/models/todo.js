var declaire = require('declaire');

module.exports = declaire.Model('todos', {
  title: 'Untitled Todo',
  done: false,

  rename: function() {
    this.setTemporary('renaming', true);
  }
}, function() {
  var self = this;
  self.on('save', function() {
    self.setTemporary('renaming', false);
  });
});

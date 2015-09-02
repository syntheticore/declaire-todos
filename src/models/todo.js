var declaire = require('declaire');

module.exports = declaire.Model('todos', {
  title: 'Untitled Todo',
  done: false,

  rename: function() {
    this.set('renaming', true, {local: true});
  }
}, function() {
  var self = this;
  self.on('save revert', function() {
    self.set('renaming', false, {local: true});
  });
});

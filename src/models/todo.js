var declaire = require('declaire');

module.exports = declaire.Model('todos', {
  // Default values
  title: 'Untitled Todo',
  done: false,

  // Methods
  rename: function() {
    this.set('renaming', true, {local: true});
  }
}, function() {
  // Constructor
  console.log("Constructor called");
  this.on('save revert', function() {
    this.set('renaming', false, {local: true});
  });
});

var declaire = require('declaire');

module.exports = declaire.Model('todos', {
  // Default values
  title: 'Untitled Todo',
  done: false,

  // Methods
  // rename: function(e) {
  //   e.preventDefault();
  //   this.set('renaming', true, {local: true});
  // }

// Constructor
}, function() {
  // this.set('renaming', false, {local: true});

  // this.on('save revert', function() {
  //   this.set('renaming', false, {local: true});
  // });
});

var declaire = require('declaire');


module.exports = declaire.Model('todos', {
  title: 'Untitled Todo',
  done: false,

  check: function() {
    this.save({done: true});
  }
});

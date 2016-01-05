var declaire = require('declaire');

module.exports = declaire.Model('todos', {
  // Default values
  title: 'Untitled Todo',
  done: false
});

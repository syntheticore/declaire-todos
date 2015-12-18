var declaire = require('declaire');

module.exports = declaire.ViewModel('TodoView', {
  renaming: false,

  rename: function(e) {
    this.set('renaming', true);
  }
}, function(todo) {
  // this.listenTo(todo, 'save revert', function() {
  //   this.set('renaming', false);
  // });
});

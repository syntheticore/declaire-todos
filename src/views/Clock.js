var declaire = require('declaire');


module.exports = declaire.ViewModel('Clock', {
  time: new Date(),

  displayTime: function() {
    return this.get('time').toGMTString();
  }
}, function() {
  var self = this;
  // Update model state every second once the view exists
  var iv = setInterval(function() {
    self.set('time', new Date());
  }, 1000);
  // Clear handler when the view gets removed from the DOM
  self.on('remove', function() {
    clearInterval(iv);
  });
});

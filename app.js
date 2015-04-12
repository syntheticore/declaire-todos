var $ = require('jquery');


require('declaire')({
  mongoDevUrl: 'mongodb://127.0.0.1:27017/todos',
  beforeConnect: function(app, db, cb) {
    console.log("Before listen");
    cb();
  }
}, function(declaire, start) {

  var Todo = declaire.Model('todos', {
    title: 'Untitled Todo',
    done: false,

    check: function() {
      this.save({done: true});
    }
  });

  declaire.ViewModel('TodosView', {
    title: 'Todos',
    todos: Todo.all(),

    newTodo: function(text) {
      var entry = $('.entry');
      text = entry.val();
      var todo = Todo.create({title: text.slice(0, 1).toUpperCase() + text.slice(1)}).save();
      entry.val('');
    }
  });

  declaire.ViewModel('Clock', {
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

  start();
});


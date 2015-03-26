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
      // this.save({done: true});
      this.set('done', true);
      this.save();
    }
  });

  // Todo.load('5508964116424abd1a557cf0', function(todo) {
  //   console.log(todo);
  //   // todo.delete(function() {
  //   //   console.log('deleted');
  //   // });
  // });

  declaire.ViewModel('TodosView', {
    title: 'Todos',
    // todos: declaire.Collection(),
    todos: Todo.all(),

    newTodo: function(text) {
      var entry = $('#entry');
      text = entry.val();
      var todo = Todo.create({title: text.slice(0, 1).toUpperCase() + text.slice(1)}).save();
      // this.get('todos').add(todo);
      entry.val('');
      // declaire.defer(function() {
      //   todo.check();
      //   todo.set('title', 'boo');
      // }, 1000);
    }
  });

  start();
});


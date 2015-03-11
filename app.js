var declaire = require('declaire');


var Todo = declaire.Model('todos', {
  title: 'Untitled Todo',
  done: false,

  check: function() {
    // this.save({done: true});
    this.set('done', true);
    this.save();
  }
});


declaire.ViewModel('TodosView', {
  title: 'Todos',
  todos: declaire.Collection(Todo),

  newTodo: function(text) {
    var todo = Todo.create();
    var entry = $('#entry');
    text = entry.val();
    console.log(text);
    todo.set('title', text.slice(0, 1).toUpperCase() + text.slice(1));
    todo.save();
    var todos = this.get('todos');
    console.log(todos);
    todos.add(todo);
    // this.set('todos', todos);
    entry.val('');
    // _.delay(function() {
    //   todo.check();
    //   todo.set('title', 'boo');
    // }, 1000);
  }
});


declaire.start({
  mongoDevUrl: 'mongodb://127.0.0.1:27017/todos'
});

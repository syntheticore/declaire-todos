var Declaire = require('declaire');

var Todo = Declaire.Model('todo', {
  title: 'Untitled Todo',
  done: false,

  check: function() {
    // this.save({done: true});
    this.set('done', true);
  }
});

Declaire.ViewModel('TodosView', {
  title: 'Todos',
  todos: [Todo.create(), Todo.create()],

  newTodo: function(text) {
    var todo = Todo.create();
    var entry = this.$el.find('#entry');
    text = entry.val();
    todo.set('title', text.toUpperCase());
    var todos = this.get('todos');
    todos.push(todo);
    this.set('todos', todos);
    entry.val('');
    // _.delay(function() {
    //   todo.check();
    //   todo.set('title', 'boo');
    // }, 1000);
  }
});

Declaire.start({
  mongoDevUrl: 'mongodb://127.0.0.1:27017/todos'
});

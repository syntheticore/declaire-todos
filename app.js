var declaire = require('declaire');
var _ = declaire.Utils;


var app = declaire.Application({
  mongoDevUrl: 'mongodb://127.0.0.1:27017/todos',
  npmPublic: ['todomvc-app-css', 'todomvc-common']
});

var Todo = app.use(require('./src/models/todo.js'));

app.ViewModel('TodosView', {
  newTodo: function(e) {
    var text = e.target.value;
    Todo.create({title: text.slice(0, 1).toUpperCase() + text.slice(1)}).save();
    e.target.value = '';
  },

  markAllComplete: function(e) {
    // Todo.all().resolve(function(todos) {
    //   _.each(todos, function(todo) {
    //     todo.set('done', e.target.checked);
    //   });
    // });
    Todo.all().set('done', e.target.checked);
  },

  clearCompleted: function() {
    // this.completedTodos().resolve(function(todos) {
    //   _.invoke(todos, 'delete');
    // });
    this.completedTodos().invoke('delete');
  },

  activeTodos: function() {
    return Todo.all().filter({done: false});
  },

  completedTodos: function() {
    return Todo.all().filter({done: true});
  },

  todos: function() {
    var page = _.last(app.mainModel.get('_page').split('/'));
    // if(page == 'all') {
    //   return Todo.all();
    // } else if(page == 'active') {
    //   return this.activeTodos();
    // } else if(page == 'completed') {
    //   return this.completedTodos();
    // }
    return _.choose(page, {
      all: Todo.all(),
      active: this.activeTodos(),
      completed: this.completedTodos()
    });
  }
});

app.init(function(start) {
  start();
});

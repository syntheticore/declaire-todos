var declaire = require('declaire');
var _ = declaire.Utils;

var app = declaire.Application({
  mongoDevUrl: 'mongodb://127.0.0.1:27017/todos',
  npmPublic: ['todomvc-app-css', 'todomvc-common']
});

var Todo = app.use(require('./src/models/todo.js'));

app.ViewModel('TodosView', {
  allTodos: Todo.all(),
  activeTodos: Todo.filter({done: false}),
  completedTodos: Todo.filter({done: true}),

  newTodo: function(e) {
    Todo.create({title: _.capitalize(e.target.value)}).save();
    e.target.value = '';
  },

  markAllComplete: function(e) {
    Todo.all().set('done', e.target.checked).invoke('save');
  },

  clearCompleted: function() {
    this.get('completedTodos').invoke('delete');
  },

  todos: function() {
    var page = _.last(app.mainModel.get('_page').split('/'));
    return ({
      active: this.get('activeTodos'),
      completed: this.get('completedTodos')
    }[page]) || this.get('allTodos');
  }
});

app.init(function(start) {
  start();
});

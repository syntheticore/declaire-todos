var Declaire = require('declaire');
var _ = Declaire.Utils;


var app = Declaire.Application({
  mongoDevUrl: 'mongodb://127.0.0.1:27017/todos',
  npmPublic: ['todomvc-app-css', 'todomvc-common']
});

var Todo = app.use(require('./src/models/todo.js'));

app.ViewModel('TodosView', {
  // Queries
  allTodos: Todo.all(),
  activeTodos: Todo.filter({done: false}),
  completedTodos: Todo.filter({done: true}),

  // Actions
  newTodo: function(e) {
    Todo.create({title: _.capitalize(e.target.value.trim())}).save();
    e.target.value = '';
  },

  markAllComplete: function(e) {
    this.get('allTodos').invoke('save', {done: e.target.checked});
  },

  clearCompleted: function() {
    this.get('completedTodos').invoke('delete');
  },

  // Computed properties
  everythingDone: function() {
    return this.get('activeTodos').length().then(function(length) {
      return length == 0;
    });
  },

  todos: function() {
    var page = _.last(app.mainModel.get('_page').split('/'));
    console.log(page);
    return {
      active: this.get('activeTodos'),
      completed: this.get('completedTodos')
    }[page] || this.get('allTodos');
  },

  // Helpers
  pluralize: function(word, n) {
    return word + (n == 1 ? '' : 's');
  }
});

app.init(function(start) {
  start();
});

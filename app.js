var declaire = require('declaire');
var _ = declaire.utils;

// Configure application
var app = declaire.Application({
  mongoDevUrl: 'mongodb://127.0.0.1:27017/todos',
  npmPublic: ['todomvc-app-css', 'todomvc-common']
});

// Load and register external data and view models
var Todo = app.use(require('./src/models/todo.js'));
app.use(require('./src/views/TodoView.js'));

// Declare main view model directly on the app
app.ViewModel('TodosView', {
  // Queries
  allTodos: Todo.all(),
  activeTodos: Todo.filter({done: false}),
  completedTodos: Todo.filter({done: true}),

  // Actions
  newTodo: function(e) {
    console.log(e);
    var title = _.capitalize(e.target.value.trim());
    console.log(title);
    title && Todo.create({title: title}).save();
    console.log("created");
    e.target.value = '';
  },

  markAll: function(e) {
    this.get('allTodos').invoke('save', {done: e.target.checked});
  },

  clearCompleted: function() {
    this.get('completedTodos').invoke('delete');
  },

  // Computed properties
  todos: function() {
    var page = _.last(app.mainModel.get('_page').split('/'));
    console.log(page);
    return {
      active: this.get('activeTodos'),
      completed: this.get('completedTodos')
    }[page] || this.get('allTodos');
  },

  everythingDone: function() {
    return this.get('activeTodos').size().then(function(size) {
      return size == 0;
    });
  },

  pluralize: function(word, n) {
    return word + (n == 1 ? '' : 's');
  }
});

// Run the application
app.init(function(start) {
  start(); 
});

var $ = require('jquery');
var declaire = require('declaire');

var app = declaire.Application({
  baseUrl: '/pages',
  mongoDevUrl: 'mongodb://127.0.0.1:27017/todos'
});

var Todo = app.use(require('./src/models/todo.js'));
app.use(require('./src/views/Clock.js'));

app.ViewModel('TodosView', {
  title: 'Todos',
  todos: Todo.all(),

  newTodo: function(text) {
    var entry = $('.entry');
    text = entry.val();
    var todo = Todo.create({title: text.slice(0, 1).toUpperCase() + text.slice(1)}).save();
    entry.val('');
  }
});

app.init(function(start, express, db) {
  console.log("Ready for action");
  start(function() {
    console.log("Listening");
  });
});

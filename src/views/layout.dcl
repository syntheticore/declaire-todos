head
  meta(charset="UTF-8")
  meta(name="viewport" content="width=device-width, initial-scale=1")

  title Declaire.js • TodoMVC

  link(rel="stylesheet" href="/todomvc-common/base.css")
  link(rel="stylesheet" href="/todomvc-app-css/index.css")

body
  {{route /pages/:filter}}
    {{view TodosView(filter)}}
      section.todoapp
        header.header
          h1 todos
          input.new-todo(placeholder="What needs to be done?" autofocus {{on enter newTodo}})
        
        {{if allTodos.size}}
          
          section.main
            input.toggle-all(type="checkbox" checked="{everythingDone}" {{on change markAll}})
            label(for="toggle-all") Mark all as complete
            
            ul.todo-list
              {{for todos}}
                {{view TodoView($this)}}
                  li(class="{completed: done, editing: renaming}")
                    {{if renaming}}
                      input.edit(value="{:title!}" autofocus="autofocus" {{on enter save}} {{on blur save}} {{on escape todo.revert}})
                      //- input.edit(value="{:title!}" autofocus {{on enter|blur save}} {{on escape revert}})
                    {{=>}}
                      .view({{on doubleClick rename}})
                        input.toggle(type="checkbox" checked="{done!!}")
                        label {title}
                        button.destroy({{on click delete}})
          
          footer.footer
            span.todo-count
              strong {activeTodos.size} 
              span {pluralize('item', activeTodos.size)} left
            
            ul.filters
              li > a(href="/pages/all"       class="{selected: false}"      ) All
              li > a(href="/pages/active"    class="{selected: _page == '/pages/active'}"   ) Active
              li > a(href="/pages/completed" class="{selected: _page == '/pages/completed'}") Completed

              //- li > a(href="/pages/all"       class="{selected: _page == $href}") All
              //- li > a(href="/pages/active"    class="{selected: _page == $href}") Active
              //- li > a(href="/pages/completed" class="{selected: _page == $href}") Completed

            {{if completedTodos.size}}
              button.clear-completed({{on click clearCompleted}}) Clear completed
      
      footer.info
        p Double-click to edit a todo
        p Written by <a href="https://github.com/syntheticore">Björn Breitgoff</a>
        p Part of <a href="http://todomvc.com">TodoMVC</a>
  
  script(src="/todomvc-common/base.js")

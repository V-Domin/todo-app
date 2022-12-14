            // Model Section
            // if local storage has a todos array, then use it
            // otherwise use the default arry.

            let todos;

            //retrive the local storage
            const savedTodos = JSON.parse(localStorage.getItem('todos'));
            //check uf it's an arry
            if (Array.isArray(savedTodos)) {
                todos = savedTodos;
            } else {
                todos = [{
                title: 'Go to a shop',
                dueDate: '2022-10-14',
                id: 'id1'
            },{
                title: 'Study JavaScript',
                dueDate: '2022-10-14',
                id: 'id2'
            },{
                title: 'Give the lesson',
                dueDate: '2022-10-14',
                id: 'id3'
            }];
            }

            // Creates a todo 

            function createTodo(title, dueDate){
                const id = '' + new Date().getTime()

                todos.push({
                    title: title,
                    dueDate: dueDate, 
                    id: id
                });
                saveTodos();
            }

            // Deletes a todo 
            function removeTodo(idToDelete){
                todos = todos.filter(function (todo) {
                // If the id of this todo matches idToDelete, return false
                // For everything else, return true
                if (todo.id === idToDelete) {
                    return false;
                } else {
                    return true;
                }
                });   
                saveTodos();
            }

            function setEditing(todoId) {
                todos.forEach(function (todo) {
                 if (todo.id === todoId) {
                    todo.isEditing = true;
                }
                });

            saveTodos();
            }

            function updateTodo(todoId, newTitle, newDate) {
                todos.forEach(function (todo) {
                  if (todo.id === todoId) {
                    todo.title = newTitle;
                    todo.dueDate = newDate;
                    todo.isEditing = false;
                }
                });


            saveTodos();
            }

            function toggleTodo(todoId, checked){
                todos.forEach(function(todo){
                    if (todo.id === todoId){
                        todo.isDone = checked;
                    }
                })
            }

            function saveTodos(){
                localStorage.setItem('todos', JSON.stringify(todos));
            }
            
            // Controler Section
            function addTodo(){
                const textbox = document.getElementById('todo-title')
                const title = textbox.value;

                const datePicker = document.getElementById('date-picker');
                const dueDate = datePicker.value;

                createTodo(title, dueDate);
                render()
            }


            function deleteTodo(event){
                const deleteButton = event.target;
                const idToDelete = deleteButton.id;

                removeTodo(idToDelete)

                render()
                
            }

            function onEdit(event) {
                const editButton = event.target;
                const todoId = editButton.dataset.todoId;

                setEditing(todoId);
                render();
            }

            function checkTodo(event){
                const checkBox = event.target;

                const todoId = checkBox.dataset.todoId;
                const checked = checkBox.checked;

                toggleTodo(todoId, checked);
                render()
            }

            function onUpdate(event) {
                const updateButton = event.target;
                const todoId = updateButton.dataset.todoId;

                const textbox = document.getElementById('edit-title-' + todoId);
                const newTitle = textbox.value;

                const datePicker = document.getElementById('edit-date-' + todoId);
                const newDate = datePicker.value;

                updateTodo(todoId, newTitle, newDate);
                render();
            }

            //View
            function render() {
        // reset our list
                document.getElementById('todo-list').innerHTML = '';

                todos.forEach(function (todo) {
                const element = document.createElement('div');
                element.classList.add("task")

          

          if (todo.isEditing === true) {
            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.id = 'edit-title-' + todo.id;
            textbox.classList.add("edit-title")
            element.appendChild(textbox);

            const datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.id = 'edit-date-' + todo.id;
            datePicker.classList.add("edit-date")
            element.appendChild(datePicker);

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.dataset.todoId = todo.id;
            updateButton.classList.add("update-button")
            updateButton.onclick = onUpdate;
            element.appendChild(updateButton);

        } else {
            element.innerText = todo.title + ' ' + todo.dueDate;
  

            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.classList.add("edit-button")
            editButton.style = 'margin-left: 12px';
            editButton.onclick = onEdit;
            editButton.dataset.todoId = todo.id;
            element.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.classList.add("delete-button")
            deleteButton.style = 'margin-left: 12px';
            deleteButton.onclick = deleteTodo;
            deleteButton.id = todo.id;
            element.appendChild(deleteButton);
        }

          const todoList = document.getElementById('todo-list');
          todoList.appendChild(element);
            });
        }
            render()
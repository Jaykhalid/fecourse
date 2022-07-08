const todos        = [];
const RENDER_EVENT = 'render-todo';

document.addEventListener('DOMContentLoaded', function() {

    const submitForm   = document.getElementById('form');
    submitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTodo();
    });

    function addTodo() {
        const textTodo    = document.getElementById('title').value;
        const timestamp   = document.getElementById('date').value;

        const generatedID = generateId();
        const todoObject  = generateTodoObject(generatedID, textTodo, timestamp, false);
        todos.push(todoObject);

        document.dispatchEvent(new Event(RENDER_EVENT));
    }

    function generateId() {
        return todos.length + 1; // ah yes, this is a hacky way to generate an ID
    }

    function generateTodoObject(id, task, timestamp, isCompleted) {
        return {
            id, 
            task,
            timestamp, 
            isCompleted
        }
    }
});

document.addEventListener(RENDER_EVENT, function() {
    const toDoQueue = document.getElementById('todos');
    toDoQueue.innerHTML = '';

    const completedTodos = document.getElementById('completed-todos');
    completedTodos.innerHTML = '';

    for(let todo of todos) {
        let eachToDoEl = makeTodo(todo);

        if(!todo.isCompleted) {
            toDoQueue.append(eachToDoEl);
        } 
        else {
            completedTodos.append(eachToDoEl);
        }
    }
})

function makeTodo(todoObject) {
    const taskEl = document.createElement('h2');
    taskEl.innerHTML = '# ' + todoObject.id + '<div class=""> <hr color="#2fffaf">' + todoObject.task + '</div>';

    const dateEl = document.createElement('p');
    dateEl.innerText = todoObject.timestamp;

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('inner');
    taskContainer.append(taskEl, dateEl);

    const toDoContainer = document.createElement('div');
    toDoContainer.classList.add('item', 'shadow');
    toDoContainer.append(taskContainer);
    toDoContainer.setAttribute('id', `todoList-${todoObject.id}`);

    function addTaskToCompleted(todoId) {
        let todoTarget = findTodo(todoId);

        if(todoTarget == null) return;

        todoTarget.isCompleted = true;
        document.dispatchEvent(new Event(RENDER_EVENT));

    }

    function removeTask(todoId) {
       let todoTarget = findTodoIndex(todoId);

       if(todoTarget === -1) return;

        todos.splice(todoTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
    }

    function undoTask(todoId) {
        let todoTarget = findTodo(todoId);

        if(todoTarget == null) return;

        todoTarget.isCompleted = false;
        document.dispatchEvent(new Event(RENDER_EVENT));
    }

    function findTodo(todoId) {
        for(let todo of todos) {
            if(todo.id == todoId) {
                return todo;
            }
        }
        return null;
    }

    function findTodoIndex(todoId) {
        // Cara #1
        for(const index in todos) {
            if(todos[index].id === todoId) {
                return index;
            }
        }

        // Cara #2
        // for(let i = 0; i < todos.length; i++) {
        //     if(todos[i].id === todoId) {
        //         return i;
        //     }
        // }
     
        return -1;
    }

    if(todoObject.isCompleted) {
        const undoBtn = document.createElement('button');
        undoBtn.classList.add('undo-button');

        undoBtn.addEventListener('click', function() {
            undoTask(todoObject.id);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('trash-button');
        
        deleteBtn.addEventListener('click', function() {
            removeTask(todoObject.id);
        });

        toDoContainer.append(undoBtn, deleteBtn);
    }
    else {
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('check-button');
        
        checkBtn.addEventListener('click', function(e) {
            addTaskToCompleted(todoObject.id);
        });

        toDoContainer.append(checkBtn);
    }



    return toDoContainer;
}

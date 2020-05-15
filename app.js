const todoInput = document.querySelector('.todo-input') ;
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodosFromLocal);
todoButton.addEventListener('click', addToList);
todoList.addEventListener('click', actionClicks);
filterOption.addEventListener('change', filterTodos);

function addToList(event){ 
    event.preventDefault();

    if (todoInput.value !== '') {
        createNewTodoItem('');
        todoInput.value = "";
    } else { 
        alert(`                              I know you are genius! \n    But please have something to complete as task`);
    }
   
}

function createNewTodoItem(todo) { 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');

    const newItem = document.createElement("li");
    newItem.innerText = todo !== '' ? todo : todoInput.value;
    newItem.classList.add("todo-item");
    todoDiv.appendChild(newItem);
    
    if (!todo) { saveTodoListToLocalStorage(todoInput.value); }
    
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class='fas fa-check'></i>";
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}

function actionClicks(event) { 
    const item = event.target;
    const itemParent = item.parentElement;

    if (item.classList[0] === 'trash-btn') {
        itemParent.classList.add('fall');
        removeLocalTodo(itemParent);
        itemParent.addEventListener('transitionend', function () { 
            itemParent.remove();
        });
        
    } else if (item.classList[0] === 'complete-btn') { 
        itemParent.classList.toggle('completed');
    }
}

function filterTodos(event) { 
    const todos = todoList.childNodes;

    todos.forEach(function (todo) { 
        switch (event.target.value) { 
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });

}

function localStorageCheck() { 
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function saveTodoListToLocalStorage(todo) {
    todos = localStorageCheck();

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
 }

function getTodosFromLocal() { 
    todos = localStorageCheck();

    todos.forEach(todo => {
        createNewTodoItem(todo);
        console.log(todo);
    });
}

function removeLocalTodo(todo) { 
    todos = localStorageCheck();
    
    todos.splice(todos.indexOf(todo.children[0].innerText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

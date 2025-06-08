// Will know follow React approach when updating the DOM (calculates the difference and if there is any will update the DOM based on the differnce only)

const addedTodoContainer = document.getElementsByClassName("added-todo-container")[0];
let oldTodos = []; // the old state in React is maintained using VirtualDOM (kind of variable)

// Doing DOM manipulation is expensive


// This is what React Calculates
function calculateDifferenceReactApproach(latestTodos) {
    if(oldTodos.length === 0) {
        oldTodos = latestTodos;
        addTodoDOMManipulation(oldTodos);
        return;
        // intially no todo is present in screen => add the todos on the screen
    }
    // added Todos (compare with the latest todos and then update the oldTodos)
    const addTodo = [];
    // deleted Todos
    const deleteTodos = [];
    // updated Todos
    const updateTodos = [];
    
    for(let newTodo of latestTodos) {
        let matchHappens = false;
        for(let oldTodo of oldTodos) {
            if(oldTodo.id == newTodo.id) {
                matchHappens = true;
                const oldTitle = oldTodo.title;
                const oldDescription = oldTodo.description;
                const oldCompleted = oldTodo.completed;

                const newTitle = newTodo.title;
                const newDescription = newTodo.description;
                const newCompleted = newTodo.completed;

                if(newTitle !== oldTitle || newDescription !== oldDescription || newCompleted !== oldCompleted) {
                    // update the todo
                    updateTodos.push({
                        id: newTodo.id,
                        title: newTitle,
                        description: newDescription,
                        completed: newCompleted
                    })
                }
                // break out of the loop
                break;
            }
        }

        // means newTodo is the latest that we does not have
        if(!matchHappens) {
            addTodo.push(newTodo);
        }
    }

    // detect deleted todos
    for(let oldTodo of oldTodos) {
        const stillExist = latestTodos.find(newTodo => oldTodo.id == newTodo.id);

        if(!stillExist) {
            deleteTodos.push(oldTodo);
        }
    }

    // if any difference is calculated then React delegates the task of DOM manipulation to the ReactDOM
    if(addTodo.length) {
        // these DOM updation functions is taken care by the ReactDOM
        addTodoDOMManipulation(addTodo);
    }

    if(updateTodos.length) {
        // these DOM updation functions is taken care by the ReactDOM
        updateTodoDomManipulation(updateTodos);
    }

    if(deleteTodos.length) {
        // these DOM updation functions is taken care by the ReactDOM
        deleteElementDomManipulation(deleteTodos);
    }

    oldTodos = latestTodos;
}

function updateTodoDomManipulation(state) {
    const container = addedTodoContainer.querySelector(".container");

    for(let todo of state) {
        const updateElement = container.querySelector(`#${todo.id}`);

        const children = updateElement.children;
        console.log(children);
        children[0].textContent = todo.title;
        children[1].textContent = todo.description;
        children[2].textContent = todo.completed;
    }
}

function deleteElementDomManipulation(state) {
    const container = addedTodoContainer.querySelector(".container");
    for(let todo of state) {
        const removeElement = container.querySelector(`#${todo.id}`);
        container.removeChild(removeElement);
    }
}

function addTodoDOMManipulation(state) {

    let container = addedTodoContainer.querySelector(".container");

    if(!container) {
        container = document.createElement("div");
        container.classList.add("container");
    }
    
    for(let todo of state) {
        const tempContainer =  document.createElement("div");
        const titleElement = document.createElement("div");
        const descriptionElement = document.createElement("div");
        const buttonElement = document.createElement("button");

        titleElement.textContent = todo.title;
        descriptionElement.textContent = todo.description;
        buttonElement.textContent = todo.completed;

        tempContainer.append(titleElement, descriptionElement, buttonElement);
        tempContainer.setAttribute("id", todo.id);
        container.append(tempContainer);
    }

    addedTodoContainer.append(container);
}

async function fetchTodosFromServer() {
    const resposne = await fetch("http://localhost:3000/todos");
    const todos = await resposne.json();

    calculateDifferenceReactApproach(todos)
}

setInterval(fetchTodosFromServer, 4000);

fetchTodosFromServer();
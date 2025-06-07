const addTodoBtn = document.getElementsByClassName("add-todo")[0]; // returns the element as nodeList
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const addedTodoContainer = document.getElementsByClassName("added-todo-container")[0]; // returns the element as nodeList
const resetButton = document.getElementsByClassName("reset-todo-state")[0]
const state = [{
    title: "Todo 1 title",
    description: "Todo 1 description",
}, {
    title: "Todo 2 title",
    description: "Todo 2 description",
}, {
    title: "Todo 3 title",
    description: "Todo 3 description",
}, {
    title: "Todo 4 title",
    description: "Todo 4 description",
}]


addTodoBtn.addEventListener("click", function() {
    const title = titleInput.value;
    const description = descriptionInput.value;
    
    if(!title || !description) {
        alert("Enter valid title or description");
        return
    }

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo");

    const titleElement = document.createElement("p");
    const descriptionElement = document.createElement("p");
    const todoButton = document.createElement("button");

    titleElement.textContent = title;
    descriptionElement.textContent = description;
    todoButton.textContent = "Mark as done";

    todoButton.addEventListener("click", function() {
        this.textContent = "Done"
    })

    // append is used to insert elemnts or string
    // appendChild is used to insert only elements
    todoContainer.append(titleElement);
    todoContainer.append(descriptionElement);
    todoContainer.append(todoButton);

    addedTodoContainer.append(todoContainer);

    // whole thing that have done above is "HARD to do" (making the website dynamic) (we have done DOM manipulation)
    // React / other frameworks make these things (DOM manipulation) very easy by providing other syntax

    // the above logic only "adds the todo", but what if we want to update or delete a todo we have to do more DOM manipulation.
    // Also what if we get the todos from a backend server (central state to maintian the todos) and then we have to add the todos to the website by doing DOM manipulation
    
    // these above mention things are hard (doing DOM manipulation (changing the website)) -> React make these things very by providing easy syntax.

    // underthehood React also do these DOM manipulations to make the websites Dynamic

    // DOM manipulation / using DOM is the only way to make the websites dynamic
})

function updateDOMWithTodoState(state) {
    // empty the addTodoContainer means removes the child from the element
    // while(addedTodoContainer.firstChild) {
    //     addedTodoContainer.removeChild(addedTodoContainer.firstChild)
    // }

    // syntax 2 more modern
    addedTodoContainer.replaceChildren() // does not provide any => empties the element 
    const container = document.createElement("div");

    for(let todo of state) {
        container.append(provideTodoElementContainer(todo));
    }

    container.setAttribute("class", "state-container")

    // container contains all the todos
    addedTodoContainer.append(container);
    
}

function provideTodoElementContainer(todo) {
    const container = document.createElement("div");
    const titleElement = document.createElement("div");
    const descriptionElement = document.createElement("div");
    const buttonElement = document.createElement("button");

    titleElement.textContent = todo.title;
    descriptionElement.textContent = todo.description;
    buttonElement.textContent = "Mark as done!"

    container.append(titleElement, descriptionElement, buttonElement);

    return container;

}

// resetButton.addEventListener("click", function() {
//     // this approach is not optimum everytime we clears the screen and then add elements, what if the elements are same ? then also we are updating, if Using React it will take care of that 

//     // In React there is always updation based on the "difference" if no difference => no updation, while our logic always have updation.

//     // 
//     updateDOMWithTodoState(state)

//     // => When using react we will provide the state / data to the React and it will internal do the DOM manipulation things 

// })


setInterval(async function() {
    const response = await fetch("http://localhost:3000/todos");
    const todos = await response.json();


    // we always update the todos without calculating the difference between other state and new state (React does this calculation differnence)
    updateDOMWithTodoState(todos);
}, 10000);


// DOM manipulation means making the website dynamic(content / appearence of the website can be changed without reloading) using the DOM api provided by the browser


// "React" calculates the difference between the states (olderData and newData) if there is any change between them then uses the ReactDOM (to update the DOM elements / do the DOM manipulation) / ReactNative (to update the native elements in the mobile app)

// "React" handles older state using VirtualDOM (kind of a variable that react maintains) and provides us syntax to provide the new value => compares them if there is changes between these state => intiates the updation using ReactDOM only to the specfic changes elements (under the hood does DOM manipulation)
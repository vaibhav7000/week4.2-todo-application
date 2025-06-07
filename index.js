const addTodoBtn = document.getElementsByClassName("add-todo")[0]; // returns the element as nodeList
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const addedTodoContainer = document.getElementsByClassName("added-todo-container")[0]; // returns the element as nodeList


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


})

// DOM manipulation means making the website dynamic(content / appearence of the website can be changed without reloading) using the DOM api provided by the browser
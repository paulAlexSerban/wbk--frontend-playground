export const config = {
    type: "widget",
    name: "ToDoListApp",
};

export const ToDoListApp = () => {
    const global = { state: {}, elements: {} };

    const init = () => {
        setupDomReferences();
        setupEventListeners();
    };

    const setupDomReferences = () => {
        global.elements.addForm = document.querySelector(".js-add");
        global.elements.search = document.querySelector(".js-search input");
        global.elements.list = document.querySelector(".js-todos");
    };

    const setupEventListeners = () => {
        // add todos event
        global.elements.addForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const todo = global.elements.addForm.add.value.trim();

            if (todo.length) {
                generateTemplate(todo);
                global.elements.addForm.reset();
            }
        });

        // delete todos event
        global.elements.list.addEventListener("click", (e) => {
            if (e.target.classList.contains("js-delete")) {
                e.target.parentElement.remove();
            }
        });

        // filter todos event
        global.elements.search.addEventListener("keyup", () => {
            const term = global.elements.search.value.trim().toLowerCase();
            filterTodos(term);
        });
    };

    const generateTemplate = (todo) => {
        const html = `
        <li class="to-do-list-app__todo justify-content-between align-items-center">
          <span>${todo}</span>
          <i class="far fa-trash-alt to-do-list-app__delete js-delete"></i>
        </li>
      `;
        global.elements.list.innerHTML += html;
    };

    const filterTodos = (term) => {
        const todosArray = Array.from(global.elements.list.children);
        // add filtered class
        todosArray
            .filter((todo) => {
                return !todo.textContent.toLowerCase().includes(term);
            })
            .forEach((todo) => {
                todo.classList.add("to-do-list-app__filtered");
            });

        // remove filtered class
        todosArray
            .filter((todo) => {
                return todo.textContent.toLowerCase().includes(term);
            })
            .forEach((todo) => {
                todo.classList.remove("to-do-list-app__filtered");
            });
    };

    init();
};



class Model {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    }

    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }

    _commit(todos) {
        this.onTodoListChanged(todos);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    addTodo(todoText) {
        this.todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false,
        };
        this.todos.push(this.todo);
        this._commit(this.todos);
    }

    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) =>
            todo.id === id
                ? {
                      id: todo.id,
                      text: updatedText,
                      complete: todo.complete,
                  }
                : todo
        );
        this._commit(this.todos);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this._commit(this.todos);
    }

    toggleTodo(id) {
        this.todos = this.todos.map((todo) =>
            todo.id === id
                ? {
                      id: todo.id,
                      text: todo.text,
                      complete: !todo.complete,
                  }
                : todo
        );

        this._commit(this.todos);
    }
}

class View {
    constructor() {
        this.init();
        this._temporaryTodoText = "";
        this._initLocalListeners();
    }

    setupElements() {
        this.app = this.getElement("#root");
        this.form = this.createElement("form");
        this.input = this.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "Add todo";
        this.input.name = "todo";
        this.submitButton = this.createElement("button");
        this.submitButton.textContent = "Submit";
        this.form.append(this.input, this.submitButton);
        this.title = this.createElement("h1");
        this.title.textContent = "Todos";
        this.todoList = this.createElement("ul", "todo-list");
        this.app.append(this.title, this.form, this.todoList);
    }

    get _todoText() {
        return this.input.value;
    }

    _resetInput() {
        this.input.value = "";
    }

    createElement(tag, className) {
        this.element = document.createElement(tag);
        if (className) {
            this.element.classList.add(className);
        }
        return this.element;
    }

    getElement(selector) {
        this.element = document.querySelector(selector);
        return this.element;
    }

    displayTodos(todos) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }

        if (todos.length === 0) {
            this.p = this.createElement("p");
            this.p.textContent = "Nothing to do! Add a task?";
            this.todoList.append(this.p);
        } else {
            todos.forEach((todo) => {
                this.li = this.createElement("li");
                this.li.id = todo.id;

                this.checkbox = this.createElement("input");
                this.checkbox.type = "checkbox";
                this.checkbox.checked = todo.complete;

                this.span = this.createElement("span");
                this.span.contentEditable = true;
                this.span.classList.add("editable");

                if (todo.complete) {
                    this.strike = this.createElement("s");
                    this.strike.textContent = todo.text;
                    this.span.append(this.strike);
                } else {
                    this.span.textContent = todo.text;
                }

                this.deleteButton = this.createElement("button", "delete");
                this.deleteButton.textContent = "Delete";
                this.li.append(this.checkbox, this.span, this.deleteButton);

                this.todoList.append(this.li);
            });
        }
    }

    _initLocalListeners() {
        this.todoList.addEventListener("input", (event) => {
            if (event.target.className === "editable") {
                this._temporaryTodoText = event.target.innerText;
            }
        });
    }

    bindAddTodo(handler) {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (this._todoText) {
                handler(this._todoText);
                this._resetInput();
            }
        });
    }

    bindDeleteTodo(handler) {
        this.todoList.addEventListener("click", (event) => {
            if (event.target.className === "delete") {
                this.id = parseInt(event.target.parentElement.id);
                handler(this.id);
            }
        });
    }

    bindEditTodo(handler) {
        this.todoList.addEventListener("focusout", (event) => {
            if (this._temporaryTodoText) {
                this.id = parseInt(event.target.parentElement.id);
                handler(this.id, this._temporaryTodoText);
                this._temporaryTodoText = "";
            }
        });
    }

    bindToggleTodo(handler) {
        this.todoList.addEventListener("change", (event) => {
            if (event.target.type === "checkbox") {
                this.id = parseInt(event.target.parentElement.id);
                handler(this.id);
            }
        });
    }

    init() {
        this.setupElements();
    }
}

class Controller {
    constructor() {
        this.init();
    }

    onTodoListChanged(todos) {
        this.view.displayTodos(todos);
    }

    handleAddTodo(todoText) {
        this.model.addTodo(todoText);
    }

    handleEditTodo(id, todoText) {
        this.model.editTodo(id, todoText);
    }

    handleDeleteTodo(id) {
        this.model.deleteTodo(id);
    }

    handleToggleTodo(id) {
        this.model.toggleTodo(id);
    }

    explicitBind() {
        this.model.bindTodoListChanged(this.onTodoListChanged);
        this.view.bindAddTodo(this.handleAddTodo);
        this.view.bindEditTodo(this.handleEditTodo);
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindToggleTodo(this.handleToggleTodo);
    }

    init() {
        this.model = new Model();
        this.view = new View();
        this.explicitBind();
        this.onTodoListChanged(this.model.todos);
    }
}

const ToDoListAppV2 = () => {
    new Controller();
};

(() => {
    ToDoListAppV2();
})();

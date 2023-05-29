export const config = {
    type: "widget",
    name: "TaskList",
};


    export const TaskList = () => {
        const global = { state: {}, elements: {} };

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const setupDomReferences = () => {
            global.elements.form = document.querySelector("#task-form");
            global.elements.taskList = document.querySelector(".collection");
            global.elements.clearBtn = document.querySelector(".clear-tasks");
            global.elements.filter = document.querySelector("#filter");
            global.elements.taskInput = document.querySelector("#task");
        };

        const setupEventListeners = () => {
            document.addEventListener("DOMContentLoaded", () => {
                getTasks();
            }); // DOM Load event
            global.elements.form.addEventListener("submit", (e) => {
                addTask(e);
            }); // Add task event
            global.elements.taskList.addEventListener("click", (e) => {
                removeTask(e);
            }); // Remove task event
            global.elements.clearBtn.addEventListener("click", () => {
                clearTasks();
            }); // Clear task event
            global.elements.filter.addEventListener("keyup", (e) => {
                filterTasks(e);
            }); // Filter tasks event
        };

        // Get Tasks from LS
        const getTasks = () => {
            let tasks;
            if (localStorage.getItem("tasks") === null) {
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem("tasks"));
            }

            tasks.forEach(function (task) {
                const li = document.createElement("li");
                li.className = "collection-item";
                li.appendChild(document.createTextNode(task));
                const link = document.createElement("a");
                link.className = "delete-item secondary-content";
                link.innerHTML = '<i class="fa fa-remove"></i>';
                li.appendChild(link);
                global.elements.taskList.appendChild(li);
            });
        };

        // Add Task
        const addTask = (e) => {
            if (global.elements.taskInput.value === "") {
                alert("Add a task");
            }

            const li = document.createElement("li");
            li.className = "collection-item";
            li.appendChild(document.createTextNode(global.elements.taskInput.value));
            const link = document.createElement("a");
            link.className = "delete-item secondary-content";
            link.innerHTML = '<i class="fa fa-remove"></i>';
            li.appendChild(link);
            global.elements.taskList.appendChild(li);
            storeTaskInLocalStorage(global.elements.taskInput.value);
            global.elements.taskInput.value = "";
            e.preventDefault();
        };

        // Store Task
        const storeTaskInLocalStorage = (task) => {
            let tasks;
            if (localStorage.getItem("tasks") === null) {
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem("tasks"));
            }

            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        };

        // Remove Task
        const removeTask = (e) => {
            if (e.target.parentElement.classList.contains("delete-item")) {
                if (confirm("Are You Sure?")) {
                    e.target.parentElement.parentElement.remove();

                    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
                }
            }
        };

        // Remove from LS
        const removeTaskFromLocalStorage = (taskItem) => {
            let tasks;
            if (localStorage.getItem("tasks") === null) {
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem("tasks"));
            }

            tasks.forEach((task, index) => {
                if (taskItem.textContent === task) {
                    tasks.splice(index, 1);
                }
            });

            localStorage.setItem("tasks", JSON.stringify(tasks));
        };

        // Clear Tasks
        const clearTasks = () => {
            while (global.elements.taskList.firstChild) {
                global.elements.taskList.removeChild(global.elements.taskList.firstChild);
            }
            // https://jsperf.com/innerhtml-vs-removechild
            clearTasksFromLocalStorage();
        };

        // Clear Tasks from LS
        const clearTasksFromLocalStorage = () => {
            localStorage.clear();
        };

        // Filter Tasks
        const filterTasks = (e) => {
            const text = e.target.value.toLowerCase();

            document.querySelectorAll(".collection-item").forEach((task) => {
                const item = task.firstChild.textContent;
                if (item.toLowerCase().indexOf(text) != -1) {
                    task.style.display = "block";
                } else {
                    task.style.display = "none";
                }
            });
        };

        init();
    };




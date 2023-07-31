import { findOne, hasClass } from "../../../../_abstracts/js/dom/traversing";
export const config = {
    type: "widget",
    name: "NoteManager",
};


(() => {
    const NoteManager = (el) => {
        const global = { state: {}, elements: {}, data: {} };
        const elem = el;

        const init = () => {
            setupDomReferences();
            setupEventListeners();
        };

        const setupDomReferences = () => {
            global.elements.ul = findOne("ul", el);
            global.elements.addButton = findOne("#add-btn", el);
            global.elements.addInput = findOne("#add-input", el);
            global.elements.hideButton = findOne("#hide", el);
            global.elements.hideToggle = findOne("#hide-toggle", el);
            global.elements.searchInput = findOne("#search-note input", el);
        };

        const setupEventListeners = () => {
            global.elements.addButton.addEventListener("click", (e) => {
                e.preventDefault();
                addItem();
            });

            global.elements.ul.addEventListener("click", (e) => {
                if (hasClass(e.target, "fa-pencil-square-o")) {
                    editItem(e);
                } else if (hasClass(e.target, "fa-times")) {
                    deleteItem(e);
                }
            });

            global.elements.hideButton.addEventListener("click", () => {
                hideItems();
            });

            global.elements.searchInput.addEventListener("keyup", (e) => {
                searchItem(e);
            });
        };

        const addItem = () => {
            if (global.elements.addInput.value !== "") {
                const li = document.createElement("li"),
                    firstPar = document.createElement("p"),
                    secondPar = document.createElement("p"),
                    firstIcon = document.createElement("img"),
                    secondIcon = document.createElement("img"),
                    input = document.createElement("input");

                firstIcon.className = "fa-pencil-square-o";
                firstIcon.src = elem.getAttribute("data-assets-pen-to-square-src");
                secondIcon.className = "fa-times";
                secondIcon.src = elem.getAttribute("data-assets-fa-times-src");
                input.className = "note-manager__edit-note";
                input.setAttribute("type", "text");
                li.className = "note-manager__note-item";
                secondPar.className = "note-manager__controls";

                firstPar.textContent = global.elements.addInput.value;

                secondPar.appendChild(firstIcon);
                secondPar.appendChild(secondIcon);
                li.appendChild(firstPar);
                li.appendChild(secondPar);
                li.appendChild(input);
                global.elements.ul.appendChild(li);
                global.elements.addInput.value = "";
            }
        };

        const editItem = (e) => {
            const parentPar = e.target.parentNode;
            parentPar.style.display = "none";

            const note = parentPar.previousElementSibling;
            const input = parentPar.nextElementSibling;

            input.style.display = "block";
            input.value = note.textContent;

            input.addEventListener("keypress", function (e) {
                if (e.keyCode === 13) {
                    if (input.value !== "") {
                        note.textContent = input.value;
                        parentPar.style.display = "block";
                        input.style.display = "none";
                    } else {
                        const li = input.parentNode;
                        li.parentNode.removeChild(li);
                    }
                }
            });
        };

        const deleteItem = (e) => {
            const list = e.target.parentNode.parentNode;
            list.parentNode.removeChild(list);
        };

        const hideItems = () => {
            if (global.elements.hideButton.checked) {
                global.elements.hideToggle.textContent = "Unhide notes";
                global.elements.ul.style.display = "none";
            } else {
                global.elements.hideToggle.textContent = "Hide notes";
                global.elements.ul.style.display = "block";
            }
        };

        const searchItem = (e) => {
            const searchChar = e.target.value.toUpperCase();

            const notes = global.elements.ul.getElementsByTagName("li");

            Array.from(notes).forEach((note) => {
                const parText = note.firstElementChild.textContent;

                if (parText.toUpperCase().indexOf(searchChar) !== -1) {
                    note.style.display = "block";
                } else {
                    note.style.display = "none";
                }
            });
        };

        init();
    };

    document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => NoteManager(el));
})();

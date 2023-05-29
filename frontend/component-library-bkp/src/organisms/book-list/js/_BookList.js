import Store from "./BookList/Store";
import Book from "./BookList/Book";
import UI from "./BookList/UI";

const BookList = () => {
    const global = {
        state: {},
        elements: {},
    };

    const init = () => {
        setupDomReferences();
        setupEventListeners();
    };

    const setupDomReferences = () => {
        global.elements.bookForm = document.getElementById("book-form");
        global.elements.bookList = document.getElementById("book-list");
        global.elements.title = document.getElementById("title");
        global.elements.author = document.getElementById("author");
        global.elements.isbn = document.getElementById("isbn");
    };

    const setupEventListeners = () => {
        if (document.readyState !== "loading") {
            Store.displayBooks();
        } else {
            document.addEventListener("DOMContentLoaded", () => {
                // console.log("DOMContentLoaded");
            });
        }

        global.elements.bookForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = global.elements.title.value;
            const author = global.elements.author.value;
            const isbn = global.elements.isbn.value;
            const book = new Book(title, author, isbn);
            const ui = new UI();

            if (title === "" || author === "" || isbn === "") {
                ui.showAlert("Please fill in all fields", "error");
            } else {
                ui.addBookToList(book);
                Store.addBook(book);
                ui.showAlert("Book Added!", "success");
                ui.clearFields();
            }
        });

        global.elements.bookList.addEventListener("click", (e) => {
            e.preventDefault();
            const ui = new UI();
            const target = e.target;

            if (target.className === "delete") {
                Store.removeBook(target.parentElement.previousElementSibling.textContent);
                ui.deleteBook(target);
            }

            ui.showAlert("Book Removed!", "success");
        });
    };

    init();
};
export default BookList;


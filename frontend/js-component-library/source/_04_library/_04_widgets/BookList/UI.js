export default class UI {
  constructor() {
    this.init();
  }

  setupDomReferences() {
    this.list = document.getElementById("book-list");
    this.container = document.querySelector(".js-container");
    this.form = document.querySelector("#book-form");
    this.title = document.getElementById("title");
    this.author = document.getElementById("author");
    this.isbn = document.getElementById("isbn");
  }

  addBookToList(book) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `;

    this.list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    this.container.insertBefore(div, this.form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }

  clearFields() {
    this.title.value = "";
    this.author.value = "";
    this.isbn.value = "";
  }

  init() {
    this.setupDomReferences();
  }
}

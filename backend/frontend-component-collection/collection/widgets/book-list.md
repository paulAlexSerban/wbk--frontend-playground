---
title: "Book List"
type: "widget"
assets: { main-js: "BookList.widget.js", main-css: "book-list.widget.css" }
---
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css" />

<div class="widget-book-list__base container js-container" data-js-widget="BookList">
  <h3>Add Book</h3>
  <form id="book-form">
    <div>
      <label for="title">Title</label>
      <input type="text" id="title" class="u-full-width">
    </div>
    <div>
      <label for="author">Author</label>
      <input type="text" id="author" class="u-full-width">
    </div>
    <div>
      <label for="isbn">ISBN#</label>
      <input type="text" id="isbn" class="u-full-width">
    </div>
    <div>
      <input type="submit" value="Submit" class="u-full-width">
    </div>
  </form>
  <table class="u-full-width">
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>ISBN</th>
        <th></th>
      </tr>
    </thead>
    <tbody id="book-list"></tbody>
  </table>
  </div>
---
title: "To Do List App v1"
type: "widget"
assets: { main-js: "ToDoListAppV1.widget.js", main-css: "to-do-list-app-v1.widget.css" }
---

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

<article class="widget-to-do-list-app__base" data-js-widget="ToDoListAppV1">
  <header class="text-center text-light my-4">
    <h1 class="mb-4">Todo List</h1>
    <form class="js-search">
      <input class="widget-to-do-list-app__input form-control m-auto" type="text" name="search" placeholder="search todos" />
    </form>
  </header>

  <ul class="list-group widget-to-do-list-app__todos js-todos mx-auto text-light">
    <li class="widget-to-do-list-app__todo justify-content-between align-items-center">
      <span>play mariokart</span>
      <i class="far fa-trash-alt widget-to-do-list-app__delete js-delete"></i>
    </li>
    <li class="widget-to-do-list-app__todo justify-content-between align-items-center">
      <span>defeat ganon in zelda</span>
      <i class="far fa-trash-alt widget-to-do-list-app__delete js-delete"></i>
    </li>
    <li class="widget-to-do-list-app__todo justify-content-between align-items-center">
      <span>make a veggie pie</span>
      <i class="far fa-trash-alt widget-to-do-list-app__delete js-delete"></i>
    </li>
  </ul>

  <form class="js-add text-center my-4">
    <label class="text-light">Add a new todo...</label>
    <input class="widget-to-do-list-app__input form-control m-auto" type="text" name="add" />
  </form>
</article>

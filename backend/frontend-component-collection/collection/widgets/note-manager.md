---
title: "Note Manager"
type: "widget"
assets: { main-js: "NoteManager.widget.js", main-css: "note-manager.widget.css" }
---

<div class="widget-note-manager__base" data-js-widget="NoteManager">
  <div class="widget-note-manager__wrapper">
    <header class="widget-note-manager__header">
      <h2>Note Manager</h2>
      <form id="search-note">
        <input class="widget-note-manager__search-input" type="text" placeholder="Search note...">
      </form>
    </header>
    <div class="note-list">
      <ul class="widget-note-manager__note-list" id="list">
        <li class="widget-note-manager__note-item">
          <p>First note</p>
          <p class="widget-note-manager__controls">
            <img class="fa-pencil-square-o" src="/svgs/fa-pen-to-square.svg"/>
            <img class="fa-times" src="/svgs/fa-times.svg" />
          </p>
          <input class="widget-note-manager__edit-note" type="text">
        </li>
        <li class="widget-note-manager__note-item">
          <p>Second note</p>
          <p class="widget-note-manager__controls">
            <img class="fa-pencil-square-o"src="/svgs/fa-pen-to-square.svg"/>
            <img class="fa-times" src="/svgs/fa-times.svg" />
          </p>
          <input class="widget-note-manager__edit-note" type="text">
        </li>
        <li class="widget-note-manager__note-item">
          <p>Third note</p>
          <p class="widget-note-manager__controls">
            <img class="fa-pencil-square-o"src="/svgs/fa-pen-to-square.svg"/>
            <img class="fa-times" src="/svgs/fa-times.svg" />
          </p>
          <input class="widget-note-manager__edit-note" type="text">
        </li>
      </ul>
    </div>
    <div class="widget-note-manager__hide-list" id="hide-list">
        <label class="widget-note-manager__hide-list-label" id="hide-toggle" for="hide">Hide notes</label>
        <input class="widget-note-manager__hide-list-checkbox" type="checkbox" id="hide">
      </div>
    <div class="widget-note-manager__add-notes" id="add-notes">
      <form class="widget-note-manager__add-notes-form" id="add">
        <input class="widget-note-manager__add-notes-item" type="text" placeholder="Add a note.." id="add-input">
        <input class="widget-note-manager__add-notes-submit" type="submit"  value="Add" id="add-btn">
      </form>
    </div>
  </div>
</div>

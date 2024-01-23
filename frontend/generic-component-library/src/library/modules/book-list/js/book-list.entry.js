import BookList from './_BookList';

(() => {
    document.querySelectorAll(`[data-js-widget=BookList]`).forEach((el) => {
        BookList(el);
    });
})();

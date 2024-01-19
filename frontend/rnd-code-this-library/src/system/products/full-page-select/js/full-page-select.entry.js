// addEventListener("DOMContentLoaded", () => {

(() => {
    function selectCategory(name) {
        const selected = document.querySelector(`main button[value="${name}"]`).closest('li');
        document.querySelectorAll('main li').forEach((li) => {
            li.classList.remove('selected');
            li.querySelector('button').innerHTML = 'Select';
        });
        selected.classList.add('selected');
        selected.querySelector('button').innerHTML = 'Selected';
    }
    document.querySelectorAll('main li button').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.target.closest('button').blur();
            selectCategory(event.target.closest('button').value);
        });
    });

    //// add category
    function addCategory(name) {
        const html = `<li>
					<img alt=" width="150" height="150" src="https://source.unsplash.com/300x300/?${name
                        .trim()
                        .toLowerCase()
                        .replaceAll(' ', ',')}" />
					<h2>${name.trim().charAt(0).toUpperCase() + name.trim().toLowerCase().slice(1)}</h2>
					<button name="category" value="${name.trim().toLowerCase()}">Select</button>
				</li>`;
        document.querySelector('main ul').insertAdjacentHTML('beforeend', html);
        document
            .querySelector(`main button[value="${name.trim().toLowerCase()}"]`)
            .addEventListener('click', () => selectCategory(name.trim().toLowerCase()));
    }
    document
        .querySelector('main > button')
        .addEventListener('click', () => document.querySelector('#add-category-modal').showModal());
    document.querySelector('#add-category-modal form').addEventListener('submit', (event) => {
        event.preventDefault();
        const categoryNameDOM = document.querySelector('#category-name');
        if (categoryNameDOM.value.trim().length > 0) {
            addCategory(categoryNameDOM.value);
            categoryNameDOM.value = '';
            document.querySelector('#add-category-modal').classList.add('hiding');
        }
    });

    //// thumbnail hack
    if (navigator.userAgent.includes('Headless')) {
        document.documentElement.style.setProperty('--transition-speed-fast', '0s');
        document.documentElement.style.setProperty('--transition-speed-medium', '0s');
        document.documentElement.style.setProperty('--transition-speed-slow', '0s');
        //const workInProgress = `<span style="position: absolute; inset-inline: 0; inset-block-end: 0; inline-size: 100%; color: #fff; background-color: #2c2446; font-size: 3rem; font-weight: bold; text-align: center; padding: 0.5rem;">Work in progress…<span>`;
        //document.body.insertAdjacentHTML("beforeend", workInProgress);
        document.body.style.setProperty('padding-block-end', '0');
        document.body.style.setProperty('margin-block-start', '152px');
        document.body.style.setProperty('min-block-size', '0');
        document.body.style.setProperty('block-size', 'calc(100vh - 304px)');
        document.body.style.setProperty('position', 'relative');
        document.querySelector('main li:nth-of-type(2) button').click();
    }

    //// modals
    document.querySelectorAll('dialog').forEach((dialog) => {
        // close .hiding dialog after animation ends
        dialog.addEventListener('animationend', (event) => {
            if (event.target.classList.contains('hiding')) {
                event.target.close();
                event.target.classList.remove('hiding');
            }
        });
        // add .hiding class when clicked on modal backdrop
        dialog.addEventListener('click', (event) => {
            const dialog = event.target.closest('dialog');
            const rect = dialog.getBoundingClientRect();
            const isInDialog =
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width;
            if (!isInDialog && event.target.tagName === 'DIALOG') {
                dialog.classList.add('hiding');
            }
        });
    });

    /// modals close buttons
    const modalCloseButtons = document.querySelectorAll('dialog .close-button');
    modalCloseButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.target.closest('button').blur();
            event.target.closest('dialog').classList.add('hiding');
        });
    });
})();

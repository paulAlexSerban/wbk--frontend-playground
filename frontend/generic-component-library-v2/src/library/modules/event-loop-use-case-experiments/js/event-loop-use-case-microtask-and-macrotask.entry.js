(() => {
    class EventLoopUseCaseMicrotaskAndMacrotask {
        constructor() {
            this.init();
        }

        setupDomRefs() {
            this.buttonFirstMicroMacrotaskExample = document.querySelector('#button-first-micro-macro-example');
        }

        setupEvents() {
            this.buttonFirstMicroMacrotaskExample.addEventListener('click', this.handleFirstMicroMacrotaskExample);
        }

        handleFirstMicroMacrotaskExample = () => {
            console.log('sync ', 1);
            setTimeout(() => console.log('macro - timeout ', 2), 0);
            Promise.resolve().then(() => console.log('micro - promise ', 3));
            Promise.resolve().then(() => setTimeout(() => console.log('macro + micro - promise + timeout', 4), 0));
            Promise.resolve().then(() => console.log('micro - promise', 5));
            setTimeout(() => console.log('macro - timeout ', 6), 0);
            console.log('sync ', 7);
        };

        init() {
            this.setupDomRefs();
            this.setupEvents();
        }
    }
    new EventLoopUseCaseMicrotaskAndMacrotask();
})();

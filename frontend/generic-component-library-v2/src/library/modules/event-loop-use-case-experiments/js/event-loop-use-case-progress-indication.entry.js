(() => {
    class EventLoopUseCaseProgressIndication {
        constructor() {
            this.init();
        }

        setupDomRefs() {
            this.unOptimizedProgressIndicator = document.querySelector('#un-optimized-progress-indicator');
            this.buttonUnOptimizedProgressIndicator = document.querySelector('#button-un-optimized-progress-indicator');
            this.splitTaskProgressIndicator = document.querySelector('#split-task-progress-indicator');
            this.buttonSplitTaskProgressIndicator = document.querySelector('#button-split-task-progress-indicator');
        }

        setupEvents() {
            this.buttonUnOptimizedProgressIndicator.addEventListener(
                'click',
                this.handleUnOptimizedProgressIndicator.bind(this)
            );
            this.buttonSplitTaskProgressIndicator.addEventListener(
                'click',
                this.handleSetTimeoutSplitOptimizationProgressIndicator.bind(this)
            );
        }

        handleUnOptimizedProgressIndicator() {
            for (let i = 0; i < 1e6; i++) {
                i++;
                this.unOptimizedProgressIndicator.innerHTML = i;
            }
        }

        handleSetTimeoutSplitOptimizationProgressIndicator() {
            let i = 0;
            const count = () => {
                // do a piece of the heavy job (*)
                do {
                    i++;
                    this.splitTaskProgressIndicator.innerHTML = i;
                } while (i % 1e3 != 0);

                if (i < 1e7) {
                    setTimeout(count);
                }
            };
            count();
        }

        init() {
            this.setupDomRefs();
            this.setupEvents();
        }
    }

    new EventLoopUseCaseProgressIndication();
})();

(() => {
    class EventLoopUseCaseExperiments {
        constructor() {
            this.init();
        }

        setupDomRefs() {
            this.jsUnOptimizedSplittingCPUHungryTask = document.querySelector(
                '#js-un-optimized-splitting-cpu-hungry-task'
            );
            this.jsSetTimeoutSplittingCPUHungryTask = document.querySelector(
                '#js-set-timeout-splitting-cpu-hungry-task'
            );
            this.jsImprovedSetTimeoutSplittingCPUHungryTask = document.querySelector(
                '#js-improved-set-timeout-splitting-cpu-hungry-task'
            );
        }

        setupEvents() {
            this.jsUnOptimizedSplittingCPUHungryTask.addEventListener(
                'click',
                this.handleUnOptimizedSplittingCPUHungryTask
            );
            this.jsSetTimeoutSplittingCPUHungryTask.addEventListener(
                'click',
                this.handleSetTimeoutSplittingCPUHungryTask
            );
            this.jsImprovedSetTimeoutSplittingCPUHungryTask.addEventListener(
                'click',
                this.handleImprovedSetTimeoutSplittingCPUHungryTask
            );
        }

        init() {
            this.setupDomRefs();
            this.setupEvents();
        }

        handleUnOptimizedSplittingCPUHungryTask() {
            let i = 0;
            let start = Date.now();
            function count() {
                // do a heavy job
                for (let j = 0; j < 1e9; j++) {
                    i++;
                }
                alert('Done in ' + (Date.now() - start) + 'ms');
            }
            count();
        }

        handleSetTimeoutSplittingCPUHungryTask() {
            let i = 0;
            let start = Date.now();
            function count() {
                // do a piece of the heavy job (*)
                do {
                    i++;
                } while (i % 1e6 != 0);

                if (i == 1e9) {
                    alert('Done in ' + (Date.now() - start) + 'ms');
                } else {
                    setTimeout(count); // schedule the new call (**)
                }
            }
            count();
        }

        handleImprovedSetTimeoutSplittingCPUHungryTask() {
            let i = 0;
            let start = Date.now();
            function count() {
                // move the scheduling to the beginning
                if (i < 1e9 - 1e6) {
                    setTimeout(count); // schedule the new call
                }

                do {
                    i++;
                } while (i % 1e6 != 0);

                if (i == 1e9) {
                    alert('Done in ' + (Date.now() - start) + 'ms');
                }
            }
            count();
        }
    }

    new EventLoopUseCaseExperiments();
})();

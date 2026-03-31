export const initPattern = () => {
    document.querySelectorAll('[data-js-cmp="DragNDrop"]').forEach((root) => {
        const fill = root.querySelector('.fill');
        const empties = root.querySelectorAll('.empty');

        if (!fill || empties.length === 0) {
            return;
        }

        fill.addEventListener('dragstart', dragStart);
        fill.addEventListener('dragend', dragEnd);

        empties.forEach((empty) => {
            empty.addEventListener('dragover', dragOver);
            empty.addEventListener('dragenter', dragEnter);
            empty.addEventListener('dragleave', dragLeave);
            empty.addEventListener('drop', dragDrop);
        });

        function dragStart() {
            this.className += ' hold';
            setTimeout(() => {
                this.className = 'invisible';
            }, 0);
        }

        function dragEnd() {
            this.className = 'fill';
        }

        function dragOver(event) {
            event.preventDefault();
        }

        function dragEnter(event) {
            event.preventDefault();
            this.className += ' hovered';
        }

        function dragLeave() {
            this.className = 'empty';
        }

        function dragDrop() {
            this.className = 'empty';
            this.append(fill);
        }
    });
};

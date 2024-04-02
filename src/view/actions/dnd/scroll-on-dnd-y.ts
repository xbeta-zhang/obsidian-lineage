import invariant from 'tiny-invariant';

export const scrollOnDndY = (node: HTMLElement) => {
    let verticalScrollTimeout: number;
    let verticalScrollDirection = 0;
    const verticalScrollStep = 10;
    const T = 50;
    const container = document.getElementById('columns-container');
    invariant(container);
    const scrollVertically = (dir: number) => {
        node.scrollTop += dir * verticalScrollStep;
        verticalScrollTimeout = requestAnimationFrame(() =>
            scrollVertically(dir),
        );
    };

    const handleDragEnter = (event: DragEvent) => {
        const rect = container.getBoundingClientRect();
        const y = event.clientY - rect.top;

        verticalScrollDirection = y < T ? -1 : y > rect.height - T ? 1 : 0;

        if (verticalScrollDirection !== 0) {
            scrollVertically(verticalScrollDirection);
        }
    };

    const handleDragLeave = () => {
        cancelAnimationFrame(verticalScrollTimeout);
        verticalScrollDirection = 0;
    };

    node.addEventListener('dragenter', handleDragEnter);
    node.addEventListener('dragleave', handleDragLeave);

    return {
        destroy() {
            node.removeEventListener('dragenter', handleDragEnter);
            node.removeEventListener('dragleave', handleDragLeave);
        },
    };
};
